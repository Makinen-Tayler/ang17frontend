import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  create(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/Post/create`, formData);
  }

  addPost(username: string, email: string, password: string) {
    var formData = { username, email, password };
    return this.http.post<any>(`${this.apiUrl}/Post/create`, formData);
  }

  getPosts() {
    return this.http.get<any>(`${this.apiUrl}/Post/users`);
  }

  delete(ids: string[]) {
    return this.http.post<any>(`${this.apiUrl}/Post/delete/`, ids);
  }

  updatePost(userId: string, username: string, email: string) {
    var formData = { userId, username, email };
    return this.http.put<any>(`${this.apiUrl}/Post/update`, formData);
  }
}
