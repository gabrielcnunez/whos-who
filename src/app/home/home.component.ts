import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { PlaylistService } from "../../services/playlist.service";
import fetchFromSpotify, { request } from "../../services/api"

const AUTH_ENDPOINT =
  "https://us-west1-spotify-api-token-request.cloudfunctions.net/getSpotifyToken"
const TOKEN_KEY = "whos-who-access-token"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private playlistService: PlaylistService) {}

  genres: { name: string; playlist_id: string }[] = []
  selectedGenre: String = ""
  selectedPlaylistId: String = ""
  authLoading: boolean = false
  configLoading: boolean = false
  token: String = "";
  playlist: any

  ngOnInit(): void {
    this.authLoading = true
    const storedTokenString = localStorage.getItem(TOKEN_KEY)
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString)
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage")
        this.authLoading = false
        this.token = storedToken.value
        this.loadGenres(storedToken.value)
        return
      }
    }
    console.log("Sending request to Google Cloud endpoint")
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      }
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken))
      this.authLoading = false
      this.token = newToken.value
      this.loadGenres(newToken.value)
    })
  }

  loadGenres = async (t: any) => {
    this.configLoading = true

    this.genres = [
      { name: "Rock Classics", playlist_id: "37i9dQZF1DWXRqgorJj26U" },
      { name: "Classic Hip Hop", playlist_id: "56un2laj6rmMUKhDlkUkAY" },
      { name: "Billboard Hot 100", playlist_id: "6UeSakyzhiEt4NB3UAd6NQ" },
      { name: "Greatest 90's Country", playlist_id: "0ZSp6ra6fFvGk4vyaqQea8" },
      { name: "Ultimate Millenial: Pop", playlist_id: "4KupkWcvdR4rfdd6qLjuHj" },
      { name: "Indie Mix", playlist_id: "37i9dQZF1EQqkOPvHGajmW" },
      { name: "Alternative Rock Mix", playlist_id: "37i9dQZF1EIefLxrHQP8p4" },
      { name: "K-Pop ON!", playlist_id: "37i9dQZF1DX9tPFwDMOaN1" },
      { name: "Emo Forever", playlist_id: "37i9dQZF1DX9wa6XirBPv8" },
    ]
    this.configLoading = false
  }

  setGenre(selectedPlaylistId: string) {
    const genreObj = this.genres.find((g) => g.playlist_id === selectedPlaylistId)
    if (genreObj) {
      this.selectedGenre = genreObj.name
      this.selectedPlaylistId = genreObj.playlist_id
    }
  }
  
  playGame() {
    if (!this.selectedPlaylistId) {
      alert("Please select a genre before playing!")
      return
    }
    fetchFromSpotify({token: this.token, endpoint: "playlists/" + this.selectedPlaylistId, params: ''})
    .then((value) => {
      this.playlistService.setPlaylist(value)
      this.router.navigate(["/gameplay"])
    })
  }
}
