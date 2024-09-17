import { Component, Input, OnInit } from '@angular/core';

interface Player {
  name: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  @Input() title!: string;
  @Input() maxEntries!: number;
  @Input() showSeeMore: boolean = false;

  allPlayers: Player[] = [
    { name: '', score: 3000 },
    { name: '', score: 2900 },
    { name: '', score: 2800 },
    { name: '', score: 2700 },
    { name: '', score: 2600 },
    { name: '', score: 2500 },
    { name: '', score: 2400 },
    { name: '', score: 2300 },
    { name: '', score: 2200 },
    { name: '', score: 2100 },
    { name: '', score: 2000 }
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
