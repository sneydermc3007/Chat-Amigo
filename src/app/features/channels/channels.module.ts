import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewChannelComponent } from './new-channel/new-channel.component';
import { InviteButtonComponent } from './invite-button/invite-button.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { StreamChatModule } from 'stream-chat-angular';


@NgModule({
  declarations: [
    NewChannelComponent,
    InviteButtonComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    StreamChatModule,
    MatAutocompleteModule
  ],
  exports: [
    NewChannelComponent,
    InviteButtonComponent
  ]
})
export class ChannelsModule { }
