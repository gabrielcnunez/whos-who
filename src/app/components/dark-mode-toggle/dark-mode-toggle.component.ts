import { Component, OnInit } from '@angular/core';
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { ThemeService } from "src/services/theme.service";

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css']
})
export class DarkModeToggleComponent implements OnInit {
  isDarkMode: boolean

  faSun = faSun
  faMoon = faMoon

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode()
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    this.themeService.setDarkMode(this.isDarkMode)
  }

  ngOnInit(): void {}

}
