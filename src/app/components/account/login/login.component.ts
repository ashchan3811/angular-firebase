import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuthService } from '../../../core/angular-fire-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuthService, private router: Router) {}

  ngOnInit() {
    this.checkLogin();
  }

  loginWithGoogle() {
    this.auth.googleLogin().then(() => this.checkLogin());
  }

  checkLogin() {
    this.auth.user.subscribe(u => {
      if (u) {
        this.router.navigate(['/home']);
      }
    });
  }
}
