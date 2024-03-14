import { Component, Renderer2, Inject, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, Validators, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule, ReactiveFormsModule, ToastrModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  themes: string[] = ['lightTheme', 'darkTheme']; // Define your themes here
  currentThemeIndex = 0; // Initial theme index

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private rend: Renderer2, @Inject(DOCUMENT) private document: Document) {}
  ngOnInit(): void {
    this.rend.addClass(this.document.body, 'lightTheme');
    this.rend.setStyle(document.body, 'background-color', '#FDFCFA');
  }

  changeTheme() {
    // Increment the theme index or loop back to 0 if at the end
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    this.setTheme(this.themes[this.currentThemeIndex]);

  }

  private setTheme(theme: string) {

    // Remove all existing theme classes
    this.themes.forEach(themeName => {
      this.rend.removeClass(this.document.body, themeName);
    });
    
    this.rend.addClass(this.document.body, theme);

    if(theme == "lightTheme") {
      this.rend.setStyle(document.body, 'background-color', '#FDFCFA');
    }
    if(theme == "darkTheme") {
      this.rend.setStyle(document.body, 'background-color', '#181818');
    }
  }
}
