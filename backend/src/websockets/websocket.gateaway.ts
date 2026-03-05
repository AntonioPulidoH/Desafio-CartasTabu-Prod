import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' }
})
@Injectable()
export class WebsocketsGateway {
  @WebSocketServer()
  server: Server; 

  private logger = new Logger('WebsocketsGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }


  notifyThemeCreated(theme: any) {
    this.server.emit('theme-created', theme);
  }


  notifyCardCreated(card: any) {
    this.server.emit('card-created', card);
  }
}