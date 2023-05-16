import { Module } from '@nestjs/common';
import { ApiWsService } from './api-ws.service';
import { ApiWsGateway } from './api-ws.gateway';

@Module({
  imports: [],
  providers: [ApiWsService, ApiWsGateway],
})
export class ApiWsModule {}
