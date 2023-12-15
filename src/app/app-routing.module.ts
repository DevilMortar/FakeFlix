import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {AboutMeComponent} from "./about-me/about-me.component";
import {MediaDetailComponent} from "./media-detail/media-detail.component";
import {WatchListComponent} from "./watch-list/watch-list.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component : HomeComponent},
  { path: 'search', component: SearchComponent },
  { path: 'watchlist', component: WatchListComponent },
  { path: 'about', component: AboutMeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'media/:id', component: MediaDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
