import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPauseCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { Howl, Howler } from 'howler';
import { GameSettingsService } from "../../services/game-settings.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  maxWrongAnswers: number = 4;
  wrongAnswers: number = 0;
  songUrl: string = '';
  sound!: Howl;
  data: any;
  image_url: string = ''
  token: String = 'YOUR_SPOTIFY_TOKEN';
  tracks: any[] = [];
  currentTrackIndex: number = 0;
  selectedGenre: string = '';
  songIsPlaying: boolean = false;
  // maxWrongAnswers: number = 4;
  // wrongAnswers: number = 0;
  score: number = 0;
  // currentTrackIndex: number = 0;
  // songIsPlaying: boolean = false;
  gameOver: boolean = false;
  winGame: boolean = false;
  answerSubmitted: boolean = false;
  resultMessage: string = '';

  faPlayCircle = faPlayCircle;
  faPauseCircle = faPauseCircle;
  faStopCircle = faStopCircle

  // @Input() score = 0;
  @Input() round = 0;
  @Input() artist1 = 'Yaosobi';
  @Input() artist2 = 'Taylor Swift';
  @Input() artist3 = 'King Gizzard and the Wizard Lizard';
  @Input() artist4 = 'Three Days Grace';

  constructor(private router: Router, private gameSettingsService: GameSettingsService) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['playlist']) {
      this.data = navigation.extras.state['playlist'];
      this.tracks = this.data.tracks.items.filter((item: any) => item.track.preview_url !== null);
      this.image_url = this.data.images[0].url
      this.loadTrack(this.currentTrackIndex);
    }

    this.setMaxWrongAnswers();
  }

  setMaxWrongAnswers() {
    const difficulty = this.gameSettingsService.getDifficulty();
    if (difficulty === 'easy') {
      this.maxWrongAnswers = 6;
    }
    if (difficulty === 'hard') {
      this.maxWrongAnswers = 2;
    }
  }

  loadTrack(index: number) {
    if (this.sound) {
      this.sound.unload();
    }
    const track = this.tracks[index].track;
    this.songUrl = track.preview_url;
    this.sound = new Howl({
      src: [this.songUrl],
      html5: true,
      onend: () => {
        this.songIsPlaying = false;
        console.log('Song ended.');
      }
    });
    this.playSong();
  }

  playSong() {
    if (!this.songIsPlaying) {
      this.sound.play();
      this.songIsPlaying = true;
    }
  }

  pauseSong() {
    if (this.songIsPlaying) {
      this.sound.pause();
      this.songIsPlaying = false;
    }
  }

  stopSong() {
    this.sound.stop();
    this.songIsPlaying = false;
  }

  submitAnswer(selectedArtist: string) {
    this.stopSong();

    const correctArtist = this.tracks[this.currentTrackIndex].track.artists[0].name;
    this.answerSubmitted = true;

    if (selectedArtist === correctArtist) {
      this.score += 150;
      this.resultMessage = "Correct!";
    } else {
      this.wrongAnswers += 1;
      this.resultMessage = "Wrong answer!";
      if (this.wrongAnswers >= this.maxWrongAnswers) {
        this.endGame();
        return;
      }
    }

    this.nextTrack();
  }

  nextTrack() {
    if (this.round < 19) { 
      this.answerSubmitted = false;
      this.currentTrackIndex++;
      this.round++;
      this.loadTrack(this.currentTrackIndex);
    } else {
      this.endGame(true);
    }
  }

  endGame(isWin: boolean = false) {
    this.gameOver = true;
    this.winGame = isWin || (this.round >= 19 && this.wrongAnswers < this.maxWrongAnswers);
  }

  restartGame() {
    this.score = 0;
    this.wrongAnswers = 0;
    this.round = 0;
    this.gameOver = false;
    this.winGame = false;
    this.loadTrack(0);
  }
}
