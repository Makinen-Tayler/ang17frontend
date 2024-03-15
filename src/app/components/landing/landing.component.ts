import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import { MaterialModule } from '../../modules/materialmodule';
import { ThemeswitchComponent } from '../themeswitch/themeswitch.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, MaterialModule, ThemeswitchComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
