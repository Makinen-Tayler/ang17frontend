import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/materialmodule';
import { ThemeService } from '../../services/theme.service';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-themeswitch',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './themeswitch.component.html',
  styleUrl: './themeswitch.component.scss'
})
export class ThemeswitchComponent implements OnInit {

  themes: string[] = ['lightTheme', 'darkTheme', 'orangeTheme']; // Define your themes here
  currentThemeIndex = 0; // Initial theme index
  activeTheme: string = "";
  toolbarColor: string = "";

  constructor(private themeService: ThemeService, private rend: Renderer2, @Inject(DOCUMENT) private document: Document) {}
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
    this.activeTheme = theme;
    if(theme == "lightTheme") {
      this.rend.setStyle(document.body, 'background-color', '#FDFCFA');
    }
    if(theme == "darkTheme") {
      this.rend.setStyle(document.body, 'background-color', '#181818');
    }
    if(theme == "orangeTheme") {
      this.rend.setStyle(document.body, 'background-color', '#ffb733');
    }
  }
}
