import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // For example, check if there's a token in local storage or if there's a session
    console.log(localStorage);
    return !!localStorage.getItem('token'); // Example: assuming a token is stored in local storage
  }
}
