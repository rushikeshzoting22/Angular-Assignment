import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://fake-json-api.mock.beeceptor.com/users/';

  constructor(private http: HttpClient) {}


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  // addUser(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, user);
  // }


  // updateUser(user: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}${user.id}`, user);
  // }


  // deleteUser(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}${id}`);
  // }
}
