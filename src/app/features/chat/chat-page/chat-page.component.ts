import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService } from 'stream-chat-angular';
import { environment } from "../../../../environments/environment";
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChatPageComponent implements OnInit {

  constructor( private chatService: ChatClientService,
                private channelService: ChannelService,
                private streamI18nService: StreamI18nService,
                private _authService: AuthService ) { }

  ngOnInit(): void {

    this.streamI18nService.setTranslation();
    this._authService.getStreamToken().pipe(
      switchMap((streamToken) => this.chatService.init(
        environment.stream.key,
        this._authService.getCurrentUSer().uid,
        streamToken
      ))
    )
  }

}
