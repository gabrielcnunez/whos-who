import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.css']
})
export class EndgameComponent implements OnInit {

  @Input() score = 0;

  public condition = true;

  constructor() { }

  ngOnInit(): void {
  }

}
