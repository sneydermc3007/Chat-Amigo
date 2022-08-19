import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {

  form!: FormGroup;

  constructor( private _auth: AuthService ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    })
  }

  signIn() {

    console.log('Inicio sesión con: ', this.form);
    this._auth.signIn(this.form.value);
  }

}
