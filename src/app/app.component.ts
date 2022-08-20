import { Component } from '@angular/core';
import { AuthService } from './features/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Chat Amigo by: SJC';
  constructor( public _auth: AuthService, private router: Router ) {}

  signOut() {
    this._auth.signOut().subscribe({
      next: () => this.router.navigate(['iniciosesion'])
    })
  }
}
