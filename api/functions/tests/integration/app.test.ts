import * as http from 'http';
import * as request from 'supertest';

import { properties } from '../../src/properties/properties';
import { App } from '../../src/app';
import { Database } from '../../src/database/database';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { sign } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { Token } from '../../src/utils/token.utils';

properties.logging.level = 'test';

let server: http.Server;
let mongod: MongoMemoryServer;
let database: Database;

function getAccessCookie() {
  const token = sign({ id: new ObjectId(), type: Token.Access }, properties.jwt.secret as string);
  return `access=${token}`;
}

beforeAll(async () => {
  mongod = new MongoMemoryServer({
    instance: {
      dbName: 'hecate'
    }
  });
  const dbUri = await mongod.getConnectionString();
  database = new Database(dbUri);
  await database.ensureConnected();
  server = new App(database).bootstrap().listen(3001);
});

afterAll(async () => {
  server.close();
  await database.disconnect();
  await mongod.stop();
});

describe('/ping', () => {
  test('Should return OK', async () => {
    const response = await request(server).get('/ping');
    expect(response.status).toEqual(200);
  });
});

describe('/create', () => {
  const cookie = getAccessCookie();

  test('Should return Unauthorized if no access token', async () => {
    const body = {
      title: 'Title',
      content: 'Content'
    };
    const response = await request(server).post('/create')
      .send(body);
    expect(response.status).toEqual(401);
  });

  test('Should return Bad Request if invalid body', async () => {
    const body = {
      content: 'Content'
    };
    const response = await request(server).post('/create')
      .send(body)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });

  test('Should create a new note', async () => {
    const body = {
      title: 'Title',
      content: 'Content'
    };
    const response = await request(server).post('/create')
      .send(body)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
  });
});

describe('/list', () => {
  const cookie = getAccessCookie();
  const notes = [
    { title: 'title1', content: 'content1' },
    { title: 'title2', content: 'content2' }
  ];

  beforeAll(async () => {
    for (const note of notes) {
      await request(server).post('/create')
        .send(note)
        .set('Cookie', cookie);
    }
  });

  test('Should return Unauthorized if no access token', async () => {
    const response = await request(server).get('/list');
    expect(response.status).toEqual(401);
  });

  test('Should return Unauthorized if invalid JWT', async () => {
    const token = sign({ id: new ObjectId(), type: 'other' }, properties.jwt.secret as string);
    const response = await request(server).get('/list')
      .set('Cookie', `access=${token}`);
    expect(response.status).toEqual(401);
  });

  test('Should return Unauthorized if invalid token', async () => {
    const token = 'qwertyuiopasdfghjklzxcvbnm';
    const response = await request(server).get('/list')
      .set('Cookie', `access=${token}`);
    expect(response.status).toEqual(401);
  });

  test('Should return user notes', async () => {
    const response = await request(server).get('/list')
      .set('Cookie', cookie);
    expect(response.status).toEqual(200);
    expect(response.body.notes).toHaveLength(notes.length);
  });

  test('Should not return any notes for new user', async () => {
    const response = await request(server).get('/list')
      .set('Cookie', getAccessCookie());
    expect(response.status).toEqual(200);
    expect(response.body.notes).toHaveLength(0);
  });
});

describe('/edit', () => {
  const cookie = getAccessCookie();
  let noteId: string;

  async function getNote() {
    const listResponse = await request(server).get('/list')
      .set('Cookie', cookie);
    expect(listResponse.status).toEqual(200);
    const notes = listResponse.body.notes;
    expect(notes).toHaveLength(1);
    return notes[0];
  }

  beforeAll(async () => {
    const body = {
      title: 'Title',
      content: 'Content'
    };
    const response = await request(server).post('/create')
      .send(body)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    noteId = response.body.id;
  });

  test('Should return Unauthorized if no access token', async () => {
    const updated = {
      id: noteId,
      title: 'Updated title',
      content: 'Updated content'
    };
    const response = await request(server).put('/edit')
      .send(updated);
    expect(response.status).toEqual(401);
  });

  test('Should return Not Found if different user', async () => {
    const updated = {
      id: noteId,
      title: 'Updated title',
      content: 'Updated content'
    };
    const response = await request(server).put('/edit')
      .send(updated)
      .set('Cookie', getAccessCookie());
    expect(response.status).toEqual(404);
  });

  test('Should return Bad Request if no ID in body', async () => {
    const updated = {
      title: 'Updated title',
      content: 'Updated content'
    };
    const response = await request(server).put('/edit')
      .send(updated)
      .set('Cookie', cookie);
    expect(response.status).toEqual(400);
  });

  test('Should edit note', async () => {
    const updated = {
      id: noteId,
      title: 'Updated title',
      content: 'Updated content'
    };
    const response = await request(server).put('/edit')
      .send(updated)
      .set('Cookie', cookie);
    expect(response.status).toEqual(204);

    const updatedNote = await getNote();
    expect(updatedNote.title).toEqual(updated.title);
    expect(updatedNote.content).toEqual(updated.content);
  });
});

describe('/delete', () => {
  const cookie = getAccessCookie();
  let noteId: string;

  async function getNotes() {
    const listResponse = await request(server).get('/list')
      .set('Cookie', cookie);
    expect(listResponse.status).toEqual(200);
    return listResponse.body.notes;
  }

  beforeAll(async () => {
    const body = {
      title: 'Title',
      content: 'Content'
    };
    const response = await request(server).post('/create')
      .send(body)
      .set('Cookie', cookie);
    expect(response.status).toEqual(201);
    noteId = response.body.id;
  });

  test('Should return Unauthorized if no access token', async () => {
    const response = await request(server).delete(`/delete/${noteId}`);
    expect(response.status).toEqual(401);
  });

  test('Should return Not Found if different user', async () => {
    const response = await request(server).delete(`/delete/${noteId}`)
      .set('Cookie', getAccessCookie());
    expect(response.status).toEqual(404);
  });

  test('Should  return internal server error if invalid ID', async () => {
    const response = await request(server).delete(`/delete/asdfghjkl`)
      .set('Cookie', cookie);
    expect(response.status).toEqual(500);
  });

  test('Should delete note', async () => {
    const response = await request(server).delete(`/delete/${noteId}`)
      .set('Cookie', cookie);
    expect(response.status).toEqual(204);

    const notes = await getNotes();
    expect(notes).toHaveLength(0);
  });
});
