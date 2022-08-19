import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {

  form!: FormGroup;

  constructor( private _auth: AuthService ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      displayName: new FormControl('', [Validators.minLength(3)]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    })
  }

  signUp() {

    console.log('Se registro con: ', this.form.value);
    this._auth.signUp(this.form.value);
  }

}
