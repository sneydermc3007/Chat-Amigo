import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, of, switchMap } from 'rxjs';
import { SignupCredentials } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this.auth);

  constructor(private auth: Auth) { }

  signIn(credentials: Object) {

    this.authState.next(credentials)
  }

  // signUp(user: Object) {

  //   this.authState.next(user)
  // }
  signUp = ( {email, password, displayName} : SignupCredentials) => {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap( ({ user }) => updateProfile(user, { displayName }))
    );
  }
}
