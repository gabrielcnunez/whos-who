import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { FormControl, FormGroup } from "@angular/forms"
import { Router } from "@angular/router"
import { faPlay, faHome, faWrench, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { LeaderboardService } from "../../services/leaderboard.service"
import { PlaylistService } from "src/services/playlist.service";

@Component({
  selector: "app-endgame",
  templateUrl: "./endgame.component.html",
  styleUrls: ["./endgame.component.css"],
})
export class EndgameComponent implements OnInit {
  won: boolean = false
  score: number = 0
  playerSubmitted: boolean = false

  faPlay = faPlay;
  faHome = faHome;
  faWrench = faWrench;
  faTrophy = faTrophy;

  userForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    score: new FormControl(this.score),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaderboardService: LeaderboardService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.won = params["win"] === "true"
      this.score = +params["score"]
      this.userForm.patchValue({ score: this.score })
    })
  }

  onSubmit() {
    const usernameControl = this.userForm.get("username");

    if (this.playerSubmitted) {
      alert("Your score was already submitted!");
      return;
    }
    if (!usernameControl || usernameControl.value.trim().length === 0) {
      alert("Player name cannot be blank!");
      return;
    }

    const player = {
      name: usernameControl.value,
      score: this.score,
    };

    this.leaderboardService.addPlayer(player);
    this.playerSubmitted = true;

    alert("Score submitted to leaderboard!");
    usernameControl.reset();
  }

  returnHome() {
    this.playlistService.setPlaylist(null)
  }
}
