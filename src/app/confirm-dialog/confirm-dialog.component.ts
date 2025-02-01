import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],  // Add MatDialogModule here
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onCancel() {
    this.dialogRef.close(false);  // Close dialog with 'false' when cancel is clicked
  }

  onConfirm() {
    this.dialogRef.close(true);   // Close dialog with 'true' when confirm is clicked
  }
}
