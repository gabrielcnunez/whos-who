import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.darkModeSubject.asObservable()

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkModeSubject.next(isDarkMode)
    if (isDarkMode) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }
  constructor() { }
}
