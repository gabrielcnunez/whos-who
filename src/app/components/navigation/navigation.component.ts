import { Component, OnInit } from '@angular/core';
import { faHome, faCog, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  faHome = faHome;
  faCog = faCog;
  faTrophy = faTrophy;

  constructor() { }

  ngOnInit(): void {
  }

}
