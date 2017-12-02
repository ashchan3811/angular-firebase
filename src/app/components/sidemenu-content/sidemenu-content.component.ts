import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { MediaHelperService } from '../../providers/media-helper.service';

@Component({
  selector: 'app-sidemenu-content',
  templateUrl: './sidemenu-content.component.html',
  styleUrls: ['./sidemenu-content.component.scss']
})
export class SidemenuContentComponent implements OnInit {
  sideNavMode: string;
  topGap: number;
  heightClass = 'desktop-content';

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private media: ObservableMedia, private mh: MediaHelperService) {
    this.mh.closeSideNav$.subscribe(val => {
      if (val) {
        this.closeSideNav();
      }
    });

    this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.sideNavMode = 'over';
        this.topGap = 55;
        this.heightClass = 'mobile-content';
      } else if (change.mqAlias === 'sm') {
        this.sideNavMode = 'over';
        this.heightClass = 'mobile-content';
      } else {
        this.sideNavMode = 'side';
        this.topGap = 60;
        this.heightClass = 'desktop-content';
      }
    });
  }

  ngOnInit() {}

  openSideNav() {
    this.sidenav.toggle();
  }

  closeSideNav() {
    this.sidenav.close();
  }
}
