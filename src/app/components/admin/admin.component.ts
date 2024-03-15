import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/materialmodule';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UsertableComponent } from './usertable/usertable.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, RouterModule, MaterialModule, UsertableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
