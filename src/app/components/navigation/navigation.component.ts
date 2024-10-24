import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faHome, faWrench, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isHomePage: boolean = false

  faHome = faHome;
  faWrench = faWrench;
  faTrophy = faTrophy;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHomePage = event.url === '/';
    });
  }
  
}
