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
  }

  onSubmit() {
    const player = {
      name: this.userForm.get("username")?.value,
      score: this.score,
    }

    this.leaderboardService.addPlayer(player)

    alert("Score Submitted to Leaderboard!")
  }
}
