import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faHome, faWrench, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';
import { ThemeService } from "src/services/theme.service";
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isHomePage: boolean = false
  isDarkMode: boolean = false
  darkModeSubscription: Subscription | undefined

  faHome = faHome;
  faWrench = faWrench;
  faTrophy = faTrophy;

  constructor(private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHomePage = event.url === '/';
    });

    this.darkModeSubscription = this.themeService.isDarkMode$.subscribe((isDark: boolean) => {
      this.isDarkMode = isDark;
    })
  }

  ngOnDestroy(): void {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

}
