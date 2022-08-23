import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService, ChannelActionsContext, CustomTemplatesService } from 'stream-chat-angular';
import { environment } from "../../../../environments/environment";
import { AuthService } from '../../auth/auth.service';
import { switchMap, Observable, catchError, map, of, from } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChatPageComponent implements OnInit, AfterViewInit {

  chatIsReady$!: Observable<boolean>;

  @ViewChild('channelActionsTemplate')
  private channelActionsTemplate!: TemplateRef<ChannelActionsContext>;

  constructor( private chatService: ChatClientService,
                private channelService: ChannelService,
                private streamI18nService: StreamI18nService,
                private _authService: AuthService,
                private customTemplatesService: CustomTemplatesService ) { }

  ngOnInit(): void {

    this.streamI18nService.setTranslation();
    this.chatIsReady$ = this._authService.getStreamToken().pipe(
      switchMap((streamToken) => this.chatService.init(
        environment.stream.key,
        this._authService.getCurrentUSer().uid,
        streamToken
      )),
      switchMap(() => this.channelService.init({
        type: 'messaging',
        members: { $in: [this._authService.getCurrentUSer().uid] }
      })),
      map(() => true),
      catchError(() => of(false))
    )
  }

  ngAfterViewInit(): void {

    this.customTemplatesService.channelActionsTemplate$.next(
      this.channelActionsTemplate
    )
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLocaleLowerCase()
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName, {
      name: name,
      members: [this._authService.getCurrentUSer().uid]
    });
    from(channel.create())
  }

}
