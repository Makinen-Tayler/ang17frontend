import { Component, Renderer2, Inject, OnInit } from '@angular/core';
import {FormsModule, Validators, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MaterialModule } from '../../modules/materialmodule';
import { HeaderComponent } from '../header/header.component';
import { PostfeedComponent } from './postfeed/postfeed.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, FormsModule, RouterModule, ReactiveFormsModule, ToastrModule, HeaderComponent, PostfeedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  themes: string[] = ['lightTheme', 'darkTheme', 'orangeTheme']; // Define your themes here
  currentThemeIndex = 0; // Initial theme index
  activeTheme: string = "";
  toolbarColor: string = "";
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private rend: Renderer2, @Inject(DOCUMENT) private document: Document) {}
  ngOnInit(): void {
    this.rend.addClass(this.document.body, 'lightTheme');
    this.rend.setStyle(document.body, 'background-color', '#FDFCFA');
  }




}
