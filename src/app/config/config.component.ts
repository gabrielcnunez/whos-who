import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.css"],
})
export class ConfigComponent implements OnInit {
  selectedDifficulty: string = 'normal';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToLeaderboard(): void {
    this.router.navigate(["/leaderboard"])
  }
}
