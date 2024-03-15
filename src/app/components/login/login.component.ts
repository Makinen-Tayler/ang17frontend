import { Component } from '@angular/core';
import {FormsModule, Validators, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MaterialModule } from '../../modules/materialmodule';
import { ThemeswitchComponent } from '../themeswitch/themeswitch.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, ToastrModule, MaterialModule, ThemeswitchComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
