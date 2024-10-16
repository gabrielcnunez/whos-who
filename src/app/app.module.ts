import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { ConfigComponent } from "./config/config.component";
import { EndgameComponent } from './endgame/endgame.component';
import { HomeComponent } from "./home/home.component";
import { GameplayComponent } from './gameplay/gameplay.component';
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { LeadersComponent } from "./components/leaders/leaders.component";
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "leaderboard", component: LeaderboardComponent },
  { path: "settings", component: ConfigComponent },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, NavigationComponent, EndgameComponent, GameplayComponent, LeadersComponent, LeaderboardComponent, ConfigComponent, DarkModeToggleComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes), FontAwesomeModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
