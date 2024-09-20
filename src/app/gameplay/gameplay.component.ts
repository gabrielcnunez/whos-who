import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPauseCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { Howl } from 'howler';
import { GameSettingsService } from "../../services/game-settings.service";
import { PlaylistService } from "../../services/playlist.service";
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
  artists: string[] = [];
  correctArtist: string = '';
  selectedGenre: string = '';
  songIsPlaying: boolean = false;
  score: number = 0
  round: number = 1
  gameOver: boolean = false;
  winGame: boolean = false;
  answerSubmitted: boolean = false;
  resultMessage: string = '';

  faPlayCircle = faPlayCircle;
  faPauseCircle = faPauseCircle;
  faStopCircle = faStopCircle

  constructor(private router: Router, private gameSettingsService: GameSettingsService, private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.data = this.playlistService.getPlaylist()
    if (this.data) {
      this.tracks = this.data.tracks.items.filter((item: any) => item.track.preview_url !== null);
      this.shuffleArray(this.tracks)
      this.image_url = this.data.images[0].url
      this.loadTrack(this.currentTrackIndex);
    }

    this.setMaxWrongAnswers();
  }

  ngOnDestroy(): void {
    if (this.sound) {
      this.sound.stop();
    }
    this.playlistService.setPlaylist(null)
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
    this.correctArtist = track.artists[0].name;
    this.artists = this.getArtists()

    this.sound = new Howl({
      src: [this.songUrl],
      html5: true,
      volume: 0.15,
      onend: () => {
        this.songIsPlaying = false;
        console.log('Song ended.');
      }
    });
    this.playSong();
  }

  getArtists(): string[] {
    const uniqueArtists = new Set<string>(
      this.tracks.map((track: any) => track.track.artists[0].name)
    );
    uniqueArtists.delete(this.correctArtist);
    const randomArtists = this.shuffleArray(Array.from(uniqueArtists)).slice(0, 3);

    return this.shuffleArray([this.correctArtist, ...randomArtists]);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    this.answerSubmitted = true;

    if (selectedArtist === this.correctArtist) {
      this.score += 300;
      this.resultMessage = "Correct!";
    } else {
      this.wrongAnswers += 1;
      this.resultMessage = "Wrong answer!";
      if (this.wrongAnswers >= this.maxWrongAnswers) {
        this.endGame();
        return;
      }
    }

    setTimeout(() => {
      this.answerSubmitted = false;
      this.nextTrack();
    }, 2000);
  }

  nextTrack() {
    if (this.round < 10) { 
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
    this.winGame = isWin || (this.round >= 9 && this.wrongAnswers < this.maxWrongAnswers);

    this.router.navigate(['/endgame'], {
      queryParams: { win: this.winGame, score: this.score }
    });
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
