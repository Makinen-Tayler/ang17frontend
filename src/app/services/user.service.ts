import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  register(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/User/register`, formData);
  }

  addUser(username: string, email: string, password: string) {
    var formData = { username, email, password };
    return this.http.post<any>(`${this.apiUrl}/User/register`, formData);
  }

  login(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/User/login`, formData);
  }

  getUsers() {
    return this.http.get<any>(`${this.apiUrl}/User/users`);
  }

  delete(ids: string[]) {
    return this.http.post<any>(`${this.apiUrl}/User/delete/`, ids);
  }
}
