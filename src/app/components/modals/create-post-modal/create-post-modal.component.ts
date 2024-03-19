import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/materialmodule';
@Component({
  selector: 'app-create-post-modal',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post-modal.component.html',
  styleUrl: './create-post-modal.component.scss'
})
export class CreatePostModalComponent {
  constructor(private postService: PostService, private toastr: ToastrService, private router: Router, private modalService: ModalService) {}

  
  postForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  onSubmit() {
    if(this.postForm.valid) {
      this.postService.create(this.postForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success(res.message, "Success!", { timeOut: 6000 });
          this.modalService.closeModal();
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error(error.error.message, "Error!", { timeOut: 3000 });
        }
      });
      this.postForm.reset();

      // Clear validation states
      Object.keys(this.postForm.controls).forEach(controlName => {
        this.postForm.get(controlName)?.clearValidators();
        this.postForm.get(controlName)?.updateValueAndValidity();
      });

    }
    else {
      this.toastr.error("Please fill out all fields!", "Oops!", {timeOut: 3000});
    }
  }
}
