import { Component, Input, OnInit } from "@angular/core"

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

  allPlayers: Player[] = [
    { name: "Yasunori Mitsuda", score: 3000 },
    { name: "Yshtola", score: 2800 },
    { name: "Audrey Horne", score: 2900 },
    { name: "Zero Two", score: 2700 },
    { name: "Todd Chavez", score: 2600 },
    { name: "Katniss Everdeen", score: 2500 },
    { name: "Margot Tenenbaum", score: 2400 },
    { name: "Richie Tenebaum", score: 2300 },
    { name: "Jolyne", score: 2200 },
    { name: "Kaneki", score: 2100 },
    { name: "Johnny Bravo", score: 2000 },
    { name: "Diamond Joe Quimby", score: 1800 },
    { name: "Diane Nguyen", score: 1700 },
    { name: "Danny Torrance", score: 1600 },
    { name: "Cassian Andor", score: 1500 },
    { name: "Burt Goodman", score: 1400 },
    { name: "Chet Desmond", score: 1300 },
    { name: "Kino Loy", score: 1200 },
    { name: "Philip J. Fry", score: 1100 },
    { name: "Pickles Aplenty", score: 1000 },
    { name: "Ralph Wiggum", score: 900 },
  ]

  displayedPlayers: Player[] = []

  constructor() {}

  ngOnInit(): void {
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
