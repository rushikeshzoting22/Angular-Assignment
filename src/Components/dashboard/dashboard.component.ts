import { Component, ViewChild, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../app/services/user.service';
import { UserFormComponent } from '../../app/user-form/user-form.component'; 
import { ConfirmDialogComponent } from '../../app/confirm-dialog/confirm-dialog.component';

export interface User {
  id: number;
  name: string;
  company: string;
  username: string;
  email: string;
  address: string;
  zip: string;
  state: string;
  country: string;
  phone: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    ConfirmDialogComponent
    
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'company', 'username', 'email', 'address', 'zip', 'state', 'country', 'phone', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  opened = true; 
  editedid : number=0;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sortUsers()
    });
  }

  sortUsers(){
    this.dataSource.data.sort(x=>x.id);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.dataSource.data.sort(x=>x.id)
        result.id=this.dataSource.data[this.dataSource.data.length-1].id+1;
        this.dataSource.data.push(result);
        this.sortUsers();
       // this.userService.addUser(result).subscribe(() => this.loadUsers());
      }
    });
  }

  editUser(user: User) {
    this.editedid = user.id;
    const dialogRef = this.dialog.open(UserFormComponent, { width: '400px', data: user });

    dialogRef.afterClosed().subscribe(result => {
      result.id=this.editedid;
      if (result) {
          this.dataSource.data = this.dataSource.data.filter(x=>x.id!=user.id);
          this.dataSource.data.push(result);
          this.sortUsers();
      }
    });
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.dataSource.data = this.dataSource.data.filter(x=>x.id!=user.id);
      this.sortUsers();
      //this.userService.deleteUser(user.id).subscribe(() => this.loadUsers());
    }
  }
}
