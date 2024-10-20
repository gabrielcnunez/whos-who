import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSun,faMoon } from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "src/services/theme.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css']
})
export class DarkModeToggleComponent implements OnInit, OnDestroy {
  isDarkMode: boolean = false
  faSun = faSun
  faMoon = faMoon
  darkModeSubscription: Subscription | undefined

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkModeSubscription = this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }

  toggleTheme() {
    this.themeService.setDarkMode(!this.isDarkMode)
  }

  ngOnDestroy(): void {
    if(this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe()
    }
  }
}
