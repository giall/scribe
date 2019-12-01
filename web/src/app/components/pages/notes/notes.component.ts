import { Component, OnInit } from '@angular/core';
import { Note } from '../../../models/note';
import { NotesService } from '../../../services/notes/notes.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../../services/alert/alert.service';
import { Action } from '../../../models/action';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[];

  constructor(private notesService: NotesService, private alert: AlertService) {
  }

  ngOnInit() {
    this.notesService.list().subscribe(notes => this.notes = notes);
  }

  delete(note: Note) {
    const action = Action.DeleteNote;
    const prompt = 'Are you sure you want to delete this note? This action cannot be undone.';
    const width = '500px';
    this.alert.showConfirmationDialog({ action, prompt, width }, () => {
      this.notesService.delete(note).subscribe(
        _ => this.notes.splice(this.notes.indexOf(note), 1),
        err => this.alert.showSnackbar(err.error)
      );
    });
  }

}
