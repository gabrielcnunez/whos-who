import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from "@angular/animations";
import { faPlayCircle, faPauseCircle, faStopCircle, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { Howl } from 'howler';
import fetchFromSpotify from 'src/services/api'; "src/services/api";
import { GameSettingsService } from "../../services/game-settings.service";
import { PlaylistService } from "../../services/playlist.service";
import { Router } from "@angular/router";

const TOKEN_KEY = "whos-who-access-token"

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css'],
  animations: [
    trigger('wrongAnswerChange', [
      transition(':increment', [
        style({ transform: 'scale(2)', color: '#f44336' }),
        animate('1.5s ease-out', style({ transform: 'scale(1)', color: '*' }))
      ])
    ]),
    trigger('scoreChange', [
      transition(':increment', [
        animate('1.5s ease-out', keyframes([
          style({ transform: 'translateY(0)', opacity: 1, offset: 0 }),
          style({ transform: 'translateY(-10px)', opacity: 0.8, offset: 0.15 }),
          style({ transform: 'translateY(10px)', opacity: 0.6, offset: 0.3 }),
          style({ transform: 'translateY(-10px)', opacity: 0.8, offset: 0.45 }),
          style({ transform: 'translateY(0)', opacity: 1, offset: 0.6 }),
          style({ transform: 'scale(1.1)', offset: 0.8 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ]),
    trigger('roundChange', [
      transition(':increment', [
        animate('1s ease-out', keyframes([
          style({ transform: 'rotateX(0deg)', opacity: 1, offset: 0 }),
          style({ transform: 'rotateX(90deg)', opacity: 0.3, offset: 0.5 }),
          style({ transform: 'rotateX(0deg)', opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class GameplayComponent implements OnInit {
  maxWrongAnswers: number = 4;
  wrongAnswers: number = 0;
  songUrl: string = '';
  sound!: Howl;
  volume: number = 0.30
  data: any;
  image_url: string = ''
  token: String = '';
  tracks: any[] = [];
  currentTrackIndex: number = 0;
  artists: string[] = [];
  played: string[] = []
  correctArtist: string = '';
  selectedAnswer: string = '';
  isCorrectAnswer: boolean = false;
  selectedGenre: string = '';
  songIsPlaying: boolean = false;
  score: number = 0
  displayScore: number = 0
  round: number = 1
  gameOver: boolean = false;
  winGame: boolean = false;
  answerSubmitted: boolean = false;
  resultMessage: string = '';

  faPlayCircle = faPlayCircle;
  faPauseCircle = faPauseCircle;
  faStopCircle = faStopCircle
  faVolumeDown = faVolumeDown
  faVolumeUp = faVolumeUp

  constructor(private router: Router, private gameSettingsService: GameSettingsService, private playlistService: PlaylistService) { }

  async ngOnInit(): Promise<void> {
    const storedTokenString = localStorage.getItem(TOKEN_KEY)
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString)
        this.token = storedToken.value
    }
    this.setVolume()
    this.data = this.playlistService.getPlaylist()
    if (this.data) {
      this.tracks = this.filterPreviewTracks(this.data.tracks.items)

      if (this.data.tracks.next) {
        await this.fetchMoreTracks(this.data.id)
      }

    this.shuffleArray(this.tracks)
    this.setMaxWrongAnswers();
    this.image_url = this.data.images[0].url
    this.loadTrack(this.currentTrackIndex);
    }
  }
  setVolume(): void {
    const slider = document.getElementById('volume') as HTMLInputElement;
    if (slider) {
      slider.style.setProperty('--value', this.volume.toString());
    }
  }

  filterPreviewTracks(items: any[]) {
    return items.filter((item: any) => item.track.preview_url !== null)
  }

  async fetchMoreTracks(playlistId: string): Promise<void> {
    const value = await fetchFromSpotify({ token: this.token, endpoint: `playlists/${playlistId}/tracks?offset=100`, params: '' });
    const tracks = this.filterPreviewTracks(value.items);
    this.tracks.push(...tracks);
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
    let track = this.tracks[index].track;
    let artistName = track.artists[0].name
    
    while (this.played.includes(artistName)) {
      index++
      track = this.tracks[index].track
      artistName = track.artists[0].name
    }
    
    this.currentTrackIndex = index
    this.songUrl = track.preview_url;
    this.correctArtist = artistName
    this.played.push(artistName)
    this.artists = this.getArtists()
    
    this.sound = new Howl({
      src: [this.songUrl],
      html5: true,
      volume: this.volume,
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
      this.sound.fade(0, this.volume, 500)
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
  
  changeVolume(volume: number) {
    this.sound.volume(volume)
    const slider = document.getElementById('volume') as HTMLInputElement

    slider.style.setProperty('--value', volume.toString())
  }
  
  submitAnswer(selectedArtist: string) {
    this.sound.fade(this.volume, 0, 250)
    this.answerSubmitted = true;
    this.selectedAnswer = selectedArtist
    this.isCorrectAnswer = (selectedArtist === this.correctArtist)
    
    if (this.isCorrectAnswer) {
      this.score += 300;
      this.incrementScore(this.score)
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
      this.stopSong();
    }, 250)
    
    setTimeout(() => {
      this.answerSubmitted = false;
      this.nextTrack();
    }, 1750)
  }

  incrementScore(finalScore: number) {
    const incrementInterval = 30;
    const incrementAmount = 5;
  
    const interval = setInterval(() => {
      if (this.displayScore >= finalScore) {
        clearInterval(interval);
        this.displayScore = finalScore; 
      } else {
        this.displayScore += incrementAmount;
      }
    }, incrementInterval);
  }
  
  nextTrack() {
    if (this.round < 10) {
      this.selectedAnswer = ''
      this.isCorrectAnswer = false
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

  ngOnDestroy(): void {
    if (this.sound) {
      this.sound.stop();
    }
  }
}
