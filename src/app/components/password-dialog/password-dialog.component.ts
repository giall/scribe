import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent, DialogData } from '../confirmation-dialog/confirmation-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMinMaxValidators, getLengthValidationError } from '../../utils/validation.util';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent {

  form = new FormGroup({
    password: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators('password')]
    )
  });

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  onSubmit() {
    this.dialogRef.close(this.form.value.password);
  }

  getLengthValidationError(field: string) {
    return getLengthValidationError(field);
  }

}
