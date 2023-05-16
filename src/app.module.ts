import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiWsGateway } from './api/ws/v1/api-ws.gateway';

@Module({
  imports: [ApiWsGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
