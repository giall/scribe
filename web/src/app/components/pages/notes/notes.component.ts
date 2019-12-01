import { Component, OnInit } from '@angular/core';
import { Note } from '../../../models/note';
import { NotesService } from '../../../services/notes/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[];

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notes = [];
    this.notesService.list().subscribe(notes => this.notes = notes);
  }

}
