import { Module } from '@nestjs/common';
import { TournamentsApiWsGateway } from './tournaments-api-ws.gateway';
import { TournamentsService } from './tournaments.service';

@Module({
  imports: [],
  providers: [TournamentsApiWsGateway, TournamentsService],
})
export class ApiWsModule {}
