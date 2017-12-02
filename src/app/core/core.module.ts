import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AngularFireAuthService } from './angular-fire-auth.service';
import { AngularFirebaseService } from './angular-firebase.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [AngularFireAuthModule, AngularFirestoreModule],
  providers: [AngularFireAuthService, AngularFirebaseService, AuthGuard]
})
export class CoreModule {}
