import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../Components/login/login.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { UserService } from './user.service';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard-component', component: DashboardComponent },
  ];

  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      MatDialogModule, 
      UserService,     
    ],
  };