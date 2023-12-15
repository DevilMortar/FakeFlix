import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FakeFlix';
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route to determine whether to show the header
        this.showHeader = this.shouldShowHeader();
      }
    });
  }

  private shouldShowHeader(): boolean {
    const currentUrl = this.router.url;
    const routesWithoutHeader = ['/login'];
    return !routesWithoutHeader.includes(currentUrl);
  }

  public toggleHeader(enabled: boolean) {
    this.showHeader = enabled;
  }

}
