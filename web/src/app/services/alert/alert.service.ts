import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from '../../models/action';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { PasswordDialogComponent } from '../../components/dialogs/password-dialog/password-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  showSnackbar(text: string) {
    this.snackBar.open(text, 'Close', {
      duration: 2000
    });
  }

  showConfirmationDialog(action: Action, callback: () => void, prompt?: string, width?: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: width || '300px',
      data: {action}
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        callback();
      }
    });
  }

  showPasswordDialog(action: Action, callback: (password: string) => void) {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '300px',
      data: {action}
    });
    dialogRef.afterClosed().subscribe((password: string) => {
      callback(password);
    });
  }
}
