import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';  
import { MatInputModule } from '@angular/material/input';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatButtonModule } from '@angular/material/button';  

@Component({
  selector: 'app-user-form',
  standalone: true, 
  imports: [
    ReactiveFormsModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatButtonModule,  
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      company: [data?.company || '', Validators.required],
      username: [data?.username || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      address: [data?.address || ''],
      zip: [data?.zip || ''],
      state: [data?.state || ''],
      country: [data?.country || ''],
      phone: [data?.phone || '']
    });
  }


  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }


  onCancel() {
    this.dialogRef.close();
  }
}
