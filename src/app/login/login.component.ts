import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, Validators, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  onSubmit() {
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success(res.message, "Success!", { timeOut: 6000 });
          localStorage.setItem('token', 'token');
          // Navigate to the route '/dashboard'
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
        }
      });
      this.loginForm.reset();

      // Clear validation states
      Object.keys(this.loginForm.controls).forEach(controlName => {
        this.loginForm.get(controlName)?.clearValidators();
        this.loginForm.get(controlName)?.updateValueAndValidity();
      });

    }
    else {
      this.toastr.error("Please fill out all fields!", "Oops!", {timeOut: 3000});
    }
  }
}
