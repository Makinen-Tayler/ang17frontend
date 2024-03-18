import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/materialmodule';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../services/modal.service';


@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss'
})
export class AddUserModalComponent {
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private modalService: ModalService) {}

  
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
          this.modalService.closeAddRealModal();
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
