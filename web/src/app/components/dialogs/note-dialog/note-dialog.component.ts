import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Field, getMinMaxValidators } from '../../../utils/validation.util';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Note } from '../../../models/note';

interface Data {
  text: string;
  note: Note;
}

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent {
  text: string;
  form = new FormGroup({
    title: new FormControl(
      ''
    ),
    content: new FormControl(
      ''
    )
  });

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {
    const { text, note } = data;
    this.text = text;
    if (note) {
      this.form.setValue({
        title: note.title,
        content: note.content
      });
    }
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }
}
