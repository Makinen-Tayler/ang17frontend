import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/materialmodule';
import { Router } from '@angular/router';
import { ThemeswitchComponent } from '../themeswitch/themeswitch.component';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, ThemeswitchComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private userService: UserService, private toastr: ToastrService, private modalService: ModalService) {}


  async openCreatePostModal() {
    this.modalService.openCreatePostModal();
  }
}
