import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Channel, UserResponse } from 'stream-chat';
import { debounceTime, Observable, startWith, switchMap } from 'rxjs';
import { DefaultStreamChatGenerics, ChatClientService } from 'stream-chat-angular';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-invite-button',
  templateUrl: './invite-button.component.html',
  styleUrls: ['./invite-button.component.scss']
})
export class InviteButtonComponent implements OnInit {

  @Input()
  channel!: Channel;

  showDialog = false;

  userSearchField = new FormControl();

  availableUsers$!: Observable<UserResponse<DefaultStreamChatGenerics>[]>;

  constructor(private chatClientService: ChatClientService) { }

  ngOnInit(): void {

    this.availableUsers$ = this.userSearchField.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap(querystring => this.chatClientService.autocompleteUsers(querystring))
    )
  }

  addToChat({ option: { value: userId } }: MatAutocompleteSelectedEvent) {
    this.channel.addMembers([userId])
  }

}
