import { Component, OnInit } from '@angular/core';
import { Note } from '../../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[];

  constructor() {
  }

  ngOnInit() {
    this.notes = [
      {
        title: 'How To',
        content: 'Click on the orange button at the bottom of the screen to create a new note.'
      }
    ];
  }

}
