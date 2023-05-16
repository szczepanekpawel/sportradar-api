import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TournamentsService } from './tournaments.service';
import { TournamentDto } from './dto/tournament.dto';

const intervalTimer = 10000;

@WebSocketGateway(81, {
  cors: {
    origin: '*',
  },
})
export class TournamentsApiWsGateway {
  @WebSocketServer()
  server: Server;

  simulationTimer: NodeJS.Timer;

  simulationInProgress: boolean;

  constructor(private tournamentsService: TournamentsService) {}

  @SubscribeMessage('start')
  onStartEvent(@MessageBody() data: TournamentDto): void {
    if (this.simulationInProgress) {
      return;
    }

    this.simulationInProgress = true;
    this.tournamentsService.simulateTournamentInTotal();
    const simulationResults = this.tournamentsService.getData();

    this.simulationTimer = setInterval(() => {
      const mappedData = simulationResults?.map((d) => {
        const teamResult = {
          left: d.teamLeft,
          right: d.teamRight,
          score: d.scoreHistory.shift(),
        };

        if (d.scoreHistory.length === 0) {
          clearInterval(this.simulationTimer);
          this.simulationInProgress = false;
        }

        return teamResult;
      });
      this.server.emit('data-package', mappedData);
    }, intervalTimer);
  }

  @SubscribeMessage('stop')
  onStopEvent(): void {
    clearInterval(this.simulationTimer);
    this.simulationInProgress = false;
  }

  @SubscribeMessage('restart')
  onResetEvent(): void {
    if (!this.simulationInProgress) {
      this.tournamentsService.restartGame();
    }
  }
}
