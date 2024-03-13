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
    return this.http.post<any>(`${this.apiUrl}/User/register`, formData)
  }
}
