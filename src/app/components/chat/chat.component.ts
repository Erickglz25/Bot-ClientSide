import { Component } from '@angular/core';

import { client } from './../../dialog-flow-client/dialog-flow.client';
import { IMessage } from './../../models/message';
import { log } from 'util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  
  conversation: IMessage[] = [];

  addMessageFromUser(message) {
    this.conversation.push({
      avatar: 'perm_identity',
      from: 'Me',
      content: message.value,
      imgRelevant:  null,
      imageStatus: 'false'
    });

    client.textRequest(message.value).then((response) => {

     //console.log(response);
      let status = 'false';
      if(response.result.fulfillment.source == 'get-movie-details') status = 'true';
      this.conversation.push({
        avatar: 'android',
        from: 'Bot',
        content: response.result.fulfillment['speech'] || 'I can\'t seem to figure that out!',
        imgRelevant: response.result.fulfillment.messages[0].speech || null,  //change Interfaces.ts >interface IServerResponse, also declare any variable used in response
        imageStatus: status
      });
      message.value = '';
    });
  }

}
