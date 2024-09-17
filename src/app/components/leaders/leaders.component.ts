import { Component, Input, OnInit } from '@angular/core';

interface Player {
  name: string;
  score: number;
}

@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {
  @Input() title!: string;
  @Input() maxEntries!: number;
  @Input() showSeeMore: boolean = false;

  allPlayers: Player[] = [
    { name: 'Yasunori Mitsuda', score: 3000 },
    { name: 'Yshtola', score: 2800 },
    { name: 'Audrey Horne', score: 2900 },
    { name: 'Zero Two', score: 2700 },
    { name: 'Todd Chavez', score: 2600 },
    { name: 'Katniss Everdeen', score: 2500 },
    { name: 'Margot Tenenbaum', score: 2400 },
    { name: 'Richie Tenebaum', score: 2300 },
    { name: 'Jolyne', score: 2200 },
    { name: 'Kaneki', score: 2100 }
  ];

  displayedPlayers: Player[] = [];

  constructor() { }

  ngOnInit(): void {
    this.displayedPlayers = this.allPlayers.slice(0, this.maxEntries);
  }

  showMorePlayers(): void {
    this.displayedPlayers = this.allPlayers;
  }

}
