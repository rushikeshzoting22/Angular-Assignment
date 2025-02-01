import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';  

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],  
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onCancel() {
    this.dialogRef.close(false);  
  }

  onConfirm() {
    this.dialogRef.close(true);   
  }
}
