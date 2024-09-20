import { Component, Input, OnInit } from "@angular/core"
import { LeaderboardService } from "../../../services/leaderboard.service";

interface Player {
  name: string
  score: number
}

@Component({
  selector: "app-leaders",
  templateUrl: "./leaders.component.html",
  styleUrls: ["./leaders.component.css"],
})
export class LeadersComponent implements OnInit {
  @Input() title!: string
  @Input() maxEntries!: number
  @Input() showSeeMore: boolean = false

  allPlayers: Player[] = [] 

  displayedPlayers: Player[] = []

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.allPlayers = this.leaderboardService.getPlayers()
    this.displayedPlayers = this.allPlayers.slice(0, this.maxEntries)
  }

  showMorePlayers(): void {
    const playersToShow = this.displayedPlayers.length + 10
    this.displayedPlayers = this.allPlayers.slice(0, playersToShow)

    if (this.displayedPlayers.length >= this.allPlayers.length) {
      this.showSeeMore = false
    }
  }
}
