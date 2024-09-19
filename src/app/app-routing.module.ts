import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EndgameComponent } from './endgame/endgame.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: 'endgame', component: EndgameComponent },
  { path: 'gameplay', component: GameplayComponent },
  { path: "leaderboard", component: LeaderboardComponent },
  { path: "settings", component: ConfigComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
