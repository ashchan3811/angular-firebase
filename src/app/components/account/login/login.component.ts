import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuthService } from '../../../core/angular-fire-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  checkLoginStatus: string;

  constructor(
    private auth: AngularFireAuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.checkLoginStatus = 'checking';
    this.checkLogin();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  loginWithGoogle() {
    this.auth.googleLogin().then(() => this.checkLogin());
  }

  loginWithGithub() {
    this.auth.githubLogin().then(() => this.checkLogin());
  }

  loginWithEmailAndPass() {
    console.log(this.loginForm.value);
  }

  checkLogin() {
    this.auth.user.subscribe(u => {
      if (u) {
        this.router.navigate(['/home']);
      } else {
        this.checkLoginStatus = 'unauthorized';
      }
    });
  }
}
