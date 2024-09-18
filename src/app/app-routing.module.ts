import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EndgameComponent } from './endgame/endgame.component';
import { GameplayComponent } from './gameplay/gameplay.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'endgame', component: EndgameComponent},
  {path: 'gameplay', component: GameplayComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
