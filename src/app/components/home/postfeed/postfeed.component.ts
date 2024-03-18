import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/materialmodule';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-postfeed',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule, NgIf],
  templateUrl: './postfeed.component.html',
  styleUrl: './postfeed.component.scss'
})
export class PostfeedComponent {

}
