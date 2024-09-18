import { Component, Input, OnInit } from '@angular/core';
import { faPlayCircle, faPauseCircle  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {

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
  }

}
