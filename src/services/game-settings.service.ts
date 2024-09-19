import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {
  private difficulty: string = 'normal'

  setDifficulty(selectedDifficulty: string) {
    this.difficulty = selectedDifficulty
  }

  getDifficulty(): string {
    return this.difficulty
  }
  
  constructor() { }
}
