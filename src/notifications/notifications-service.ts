/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddDiverNotificationDto } from 'src/@model-dto/add-diver-notification-Dto';

@WebSocketGateway()
export class NotificationsService {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('add-diver-notification')
  handleAddDiverNotification(
    @MessageBody() data: AddDiverNotificationDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Handle received message
    this.server.emit('add-diver-notification', data);
  }
}
