import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuthService } from '../../core/angular-fire-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() openSideNavbar = new EventEmitter();
  userName: string;

  constructor(public auth: AngularFireAuthService) {}

  ngOnInit() {
    this.auth.user.subscribe(u => {
      if (u) {
        this.userName = u.displayName.substr(0, 3);
      } else {
        this.userName = '';
      }
    });
  }

  logOut() {
    this.auth.signOut();
  }

  openSideNav() {
    this.openSideNavbar.emit();
  }
}
