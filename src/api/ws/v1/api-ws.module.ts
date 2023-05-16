import { Module } from '@nestjs/common';
import { ApiWsGateway } from './api-ws.gateway';

@Module({
  imports: [],
  providers: [ApiWsGateway],
})
export class ApiWsModule {}
