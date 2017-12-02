import { Component, ContentChild, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SidemenuContentComponent } from './components/sidemenu-content/sidemenu-content.component';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  contentClass: string;

  @ViewChild(SidemenuContentComponent) sidenav: SidemenuContentComponent;

  constructor(private media: ObservableMedia) {
    this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.contentClass = 'mobile-content';
      } else {
        this.contentClass = 'content';
      }
    });
  }

  ngOnInit() {}

  openSideNav() {
    this.sidenav.openSideNav();
  }

  closeSideNav() {
    this.sidenav.closeSideNav();
  }
}
