import { Component, ViewChild, OnInit } from '@angular/core';
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
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'company', 'username', 'email', 'address', 'zip', 'state', 'country', 'phone', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  opened = true; // Sidebar control

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUser(result).subscribe(() => this.loadUsers());
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, { width: '400px', data: user });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(() => this.loadUsers());
      }
    });
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe(() => this.loadUsers());
    }
  }
}
