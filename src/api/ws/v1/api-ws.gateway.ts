import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(81, {
  cors: {
    origin: '*',
  },
})
export class ApiWsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('get-data')
  onEvent(): void {
    this.server.emit('data-package', { some_data: 'xyz' });
  }
}
