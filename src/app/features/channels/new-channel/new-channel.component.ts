import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss']
})
export class NewChannelComponent implements OnInit {

  @Output()
  saved = new EventEmitter<string>();

  channelName = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  onCreate(){
    this.saved.emit(this.channelName.value)
    this.channelName.reset('')
  }

}
