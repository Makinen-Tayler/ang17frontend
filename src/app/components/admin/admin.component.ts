import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/materialmodule';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UsertableComponent } from './usertable/usertable.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, RouterModule, MaterialModule, UsertableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  constructor(private toastr: ToastrService, private router: Router) {}


  logout() {
    this.router.navigate(['/login'])
  }
}
