import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiWsModule } from './api/ws/v1/api-ws.module';

@Module({
  imports: [ApiWsModule],
  controllers: [AppController],
})
export class AppModule {}
