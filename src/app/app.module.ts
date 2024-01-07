import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';
import { MediaComponent } from './media/media.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { AboutMeComponent } from './about-me/about-me.component';
import { MediaDetailComponent } from './media-detail/media-detail.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SlideCardContainerComponent } from './slide-card-container/slide-card-container.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { HomeDemoComponent } from './home-demo/home-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavComponent,
    MediaComponent,
    AboutMeComponent,
    MediaDetailComponent,
    WatchListComponent,
    LoginComponent,
    HomeComponent,
    SlideCardContainerComponent,
    CardContainerComponent,
    BottomNavComponent,
    HomeDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
