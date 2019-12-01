import { Database } from '../database/database';
import { Note } from '../models/note';
import { ObjectId } from 'mongodb';

export class NotesRepository {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async collection() {
    return this.database.getCollection('notes');
  }

  async list(user: string): Promise<Note[]> {
    const collection = await this.collection();
    return collection.find({user}).toArray();
  }

  async create(note: Partial<Note>): Promise<Note> {
    const collection = await this.collection();
    const result = await collection.insertOne(note);
    return result.ops[0] as Note;
  }

  async update(id: string, note: Partial<Note>) {
    const collection = await this.collection();
    return collection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: note
    });
  }

  async remove(id: string) {
    const collection = await this.collection();
    return collection.deleteOne({
      _id: new ObjectId(id)
    });
  }
}
