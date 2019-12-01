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

  async update(id: string, user: string, note: Partial<Note>): Promise<boolean> {
    const collection = await this.collection();
    const result = await collection.updateOne(this.filter(id, user), {
      $set: note
    });
    return result.modifiedCount > 0;
  }

  async remove(id: string, user: string): Promise<boolean> {
    const collection = await this.collection();
    const result = await collection.deleteOne(this.filter(id, user));
    return (result.deletedCount || 0) > 0;
  }

  private filter(id: string, user: string) {
    return {
      _id: new ObjectId(id), user
    }
  }
}
