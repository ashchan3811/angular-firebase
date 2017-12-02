import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User } from './user';
import { EmailAndPasswordCred } from './email-and-password-cred';

@Injectable()
export class AngularFireAuthService {
  user: Observable<User>;

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.auth.authState.switchMap(user => {
      if (user) {
        return this.fs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  createAccountWithEmailAndPassword(user: EmailAndPasswordCred) {
    return this.auth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(credential => {
        this.updateUserData(credential.user);
      });
  }

  loginWithEmailAndPassword(user: EmailAndPasswordCred) {
    return this.auth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(credential => {
        this.updateUserData(credential.user);
      });
  }

  private oAuthLogin(provider) {
    return this.auth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.fs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data);
  }

  signOut() {
    this.auth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
