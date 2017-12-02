import { Component, OnInit } from '@angular/core';
import { AngularFireAuthService } from '../../../core/angular-fire-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuthService) {}

  ngOnInit() {}

  loginWithGoogle() {
    this.auth.googleLogin();
  }
}
