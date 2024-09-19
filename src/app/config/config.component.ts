import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { GameSettingsService } from "../../services/game-settings.service";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.css"],
})
export class ConfigComponent implements OnInit {
  selectedDifficulty: string = 'normal';

  constructor(private router: Router, private gameSettingsService: GameSettingsService) {}

  ngOnInit(): void {
    const savedDifficulty = this.gameSettingsService.getDifficulty();
    if (savedDifficulty) {
      this.selectedDifficulty = savedDifficulty;
    }
  }

  onDifficultyChange(newDifficulty: string): void {
    this.selectedDifficulty = newDifficulty;
    this.gameSettingsService.setDifficulty(this.selectedDifficulty);
  }

  goToLeaderboard(): void {
    this.router.navigate(["/leaderboard"])
  }
}
