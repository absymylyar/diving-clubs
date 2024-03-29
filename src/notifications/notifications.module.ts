import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications-service';

@Module({
  imports: [],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
