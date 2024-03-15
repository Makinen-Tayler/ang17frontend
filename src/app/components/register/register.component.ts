import { Component } from '@angular/core';
import {FormsModule, Validators, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MaterialModule } from '../../modules/materialmodule';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, ToastrModule, MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})



export class RegisterComponent {

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  onSubmit() {
    if(this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success(res.message, "Success!", { timeOut: 6000 });
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
        }
      });
      this.registerForm.reset();

      // Clear validation states
      Object.keys(this.registerForm.controls).forEach(controlName => {
        this.registerForm.get(controlName)?.clearValidators();
        this.registerForm.get(controlName)?.updateValueAndValidity();
      });

    }
    else {
      this.toastr.error("Please fill out all fields!", "Oops!", {timeOut: 3000});
    }
  }
}
