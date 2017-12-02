import { MediaHelperService } from '../../providers/media-helper.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  constructor(private router: Router, private mh: MediaHelperService) {}

  ngOnInit() {}

  goToLink(path: string) {
    this.mh.closeSideNav(true);
    this.router.navigate([`${path}`]);
  }
}
