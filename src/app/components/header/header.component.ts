import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/materialmodule';
import { Router } from '@angular/router';
import { ThemeswitchComponent } from '../themeswitch/themeswitch.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, ThemeswitchComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
