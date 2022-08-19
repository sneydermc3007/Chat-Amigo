import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from "./features/auth/signin/signin.component";
import { SignupComponent } from "./features/auth/signup/signup.component";

const routes: Routes = [
  { path: 'iniciosesion', component: SigninComponent },
  { path: 'registro', component: SignupComponent },
  { path: 'chat', loadChildren: () => import('./features/chat/chat.module').then(m => m.ChatModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
