import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from '../../models/action';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  showSnackbar(text: string) {
    this.snackBar.open(text, 'Close', {
      duration: 2000
    });
  }

  showConfirmationDialog(action: Action, callback: Function) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { action }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) callback();
    });
  }
}
