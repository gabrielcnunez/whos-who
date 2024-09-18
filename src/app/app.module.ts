import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NavigationComponent } from './components/navigation/navigation.component';
import { EndgameComponent } from './endgame/endgame.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { GameplayComponent } from './gameplay/gameplay.component';

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [AppComponent, HomeComponent, NavigationComponent, EndgameComponent, GameplayComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), FontAwesomeModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
