import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPauseCircle  } from '@fortawesome/free-solid-svg-icons';
import { Howl } from 'howler';
import { GameSettingsService } from "../../services/game-settings.service";

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  maxWrongAnswers: number = 4
  wrongAnswers: number = 0
  songUrl: string = '';
  sound!: Howl;

  faPlayCircle = faPlayCircle;
  faPauseCircle = faPauseCircle;

  @Input() score = 0;
  @Input() round = 0;
  @Input() artist1 = 'Yaosobi'
  @Input() artist2 = 'Taylor Swift'
  @Input() artist3 = 'King Gizzard and the Wizard Lizard'
  @Input() artist4 = 'Three Days Grace'

  constructor(private gameSettingsService: GameSettingsService) { }
  
  ngOnInit(): void {
    this.setMaxWrongAnswers()
    this.songUrl = 'https://p.scdn.co/mp3-preview/1de566ed732e7c2762c9c4432eb1ac3f6fa41d39?cid=06a826fc18d14c909746467bc9070b97'

    this.sound = new Howl({
      src: [this.songUrl],
      html5: true
    })
    console.log(this.maxWrongAnswers)
  }

  setMaxWrongAnswers() {
    const difficulty = this.gameSettingsService.getDifficulty()
    if (difficulty === 'easy') {
      this.maxWrongAnswers = 6
    }
    if (difficulty === 'hard') {
      this.maxWrongAnswers = 2
    }
  }

  playSong() {
    this.sound.play();
  }

  pauseSong() {
    this.sound.pause();
  }

  stopSong() {
    this.sound.stop();
  }

}
