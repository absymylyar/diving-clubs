/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddDiverNotificationDto } from 'src/@model-dto/add-diver-notification-Dto';

@WebSocketGateway()
export class NotificationsService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // Handle connection event
    console.info('handleConnection');
  }

  handleDisconnect(client: Socket) {
    // Handle disconnection event
    console.info('handleDisconnect');
  }
  @SubscribeMessage('add-diver-notification')
  handleAddDiverNotification(
    @MessageBody() data: AddDiverNotificationDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Handle received message
    this.server.emit('add-diver-notification', data);
  }
}
