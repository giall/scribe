import * as http from 'http';
import * as request from 'supertest';

import { properties } from '../../src/properties/properties';

properties.logging.level = 'test';

import { App } from '../../src/app';
import { Database } from '../../src/database/database';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { sign } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { Token } from '../../src/utils/token.utils';

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

  test('Should return unauthorized if no access token', async () => {
    const body = {
      title: 'Title',
      content: 'Content'
    };
    const response = await request(server).post('/create')
      .send(body);
    expect(response.status).toEqual(401);
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

  test('Should return unauthorized if no access token', async () => {
    const response = await request(server).get('/list');
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

  test('Should edit note', async () => {
    const body = {
      title: 'Title',
      content: 'Content'
    };
    const createResponse = await request(server).post('/create')
      .send(body)
      .set('Cookie', cookie);
    expect(createResponse.status).toEqual(201);

    const note = createResponse.body.note;
    const updated = {
      id: note.id,
      title: 'Updated title',
      content: 'Updated content'
    };
    const editResponse = await request(server).put('/edit')
      .send(updated)
      .set('Cookie', cookie);
    expect(editResponse.status).toEqual(204);

    const listResponse = await request(server).get('/list')
      .set('Cookie', cookie);
    expect(listResponse.status).toEqual(200);
    const notes = listResponse.body.notes;
    expect(notes).toHaveLength(1);
    expect(notes[0].title).toEqual(updated.title);
    expect(notes[0].content).toEqual(updated.content);
  });
});
