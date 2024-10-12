import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { FormControl, FormGroup } from "@angular/forms"
import { Router } from "@angular/router"
import { LeaderboardService } from "../../services/leaderboard.service"

@Component({
  selector: "app-endgame",
  templateUrl: "./endgame.component.html",
  styleUrls: ["./endgame.component.css"],
})
export class EndgameComponent implements OnInit {
  won: boolean = false
  score: number = 0
  playerSubmitted: boolean = false

  userForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    score: new FormControl(this.score),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaderboardService: LeaderboardService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.won = params["win"] === "true"
      this.score = +params["score"]
      this.userForm.patchValue({ score: this.score })
    })
    console.log(this.playerSubmitted)
  }

  onSubmit() {
    if (!this.playerSubmitted) {
      const player = {
        name: this.userForm.get("username")?.value,
        score: this.score,
      }
      this.leaderboardService.addPlayer(player)
      this.playerSubmitted = true

      alert("Score submitted to leaderboard!")
    } else {

      alert("Your score was already submitted!")
    }
  }
}
