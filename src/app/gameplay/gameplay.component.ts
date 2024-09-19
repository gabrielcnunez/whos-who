import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPauseCircle  } from '@fortawesome/free-solid-svg-icons';
import { Howl} from 'howler';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
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

  constructor() { }
  
  ngOnInit(): void {
    this.songUrl = 'https://p.scdn.co/mp3-preview/1de566ed732e7c2762c9c4432eb1ac3f6fa41d39?cid=06a826fc18d14c909746467bc9070b97'

    this.sound = new Howl({
      src: [this.songUrl],
      html5: true
    })
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
