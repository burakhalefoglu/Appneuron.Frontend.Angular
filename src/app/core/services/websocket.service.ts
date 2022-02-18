import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor() {}

  // TODO: Client authentication will add
  // * https://www.npmjs.com/package/ws

  listenServer(path: string, callback): void {
    // try {
    //   const userId = localStorage.getItem('userId');
    //   const ws = new WebSocket(
    //     environment.websocketConn + '/' + path + '?UserId=' + userId
    //   );
    //   ws.on('open', function open(): void {
    //     // ws.send('something');
    //     console.log('bağlantı başarılı');
    //   });
    //   ws.on('message', function incoming(message: any): void {
    //     console.log('received: %s', message);
    //     callback(message);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
