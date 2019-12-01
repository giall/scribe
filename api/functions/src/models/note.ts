import { ObjectId } from 'mongodb';

export interface Note {
  _id: ObjectId;
  title: string;
  content: string;
  user: string;
}

export class NoteDto {
  id: string;
  title: string;
  content: string;

  private constructor(note: Note) {
    this.id = note._id.toHexString();
    this.title = note.title;
    this.content = note.content;
  }

  static from(note: Note) {
    return new NoteDto(note);
  }
}
