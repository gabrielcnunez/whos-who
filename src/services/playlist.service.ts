import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlist: any
  constructor() { }

  setPlaylist(data: any) {
    this.playlist = data
  }

  getPlaylist() {
    return this.playlist
  }
}
