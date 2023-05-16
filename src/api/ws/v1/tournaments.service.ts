import { Injectable } from '@nestjs/common';

type Tournament = {
  name: string;
  games: {
    teamLeft: string;
    teamRight: string;
    score: [number, number];
    scoreHistory: [number, number][];
  }[];
  inProgress: boolean;
};

const PERMANENT_TOURNAMENT = 'Katar 2023';

@Injectable()
export class TournamentsService {
  private tournaments: Tournament[] = [];

  constructor() {
    this.setupData();
  }

  startSimulation(): void {
    const tournament = this.getTournamentByName();

    if (tournament && !tournament.inProgress) {
      tournament.inProgress = true;
    }
  }

  restartGame(): void {
    const tournament = this.getTournamentByName();

    if (tournament && tournament.inProgress) {
      tournament.inProgress = false;
      tournament.games = [];
    }
  }

  getData() {
    return this.getTournamentByName()?.games;
  }

  simulateTournamentByStepAhead(): void {
    const tournament = this.getTournamentByName();

    tournament?.games.forEach((d) => {
      d.score[Math.round(Math.random())]++;
    });
  }

  simulateTournamentInTotal(): void {
    for (let i = 0; i < 9; i++) {
      const tournament = this.getTournamentByName();

      tournament?.games.forEach((d) => {
        d.scoreHistory.push([...d.score]);
      });

      this.simulateTournamentByStepAhead();
    }
  }

  private setupData(): void {
    const tournamentName = PERMANENT_TOURNAMENT;
    const teams = [
      ['Germany', 'Poland'],
      ['Brazil', 'Mexico'],
      ['Argentina', 'Uruguay'],
    ];

    this.tournaments.push({
      name: tournamentName,
      games: teams.map((d) => ({
        teamLeft: d[0],
        teamRight: d[1],
        score: [0, 0],
        scoreHistory: [],
      })),
      inProgress: false,
    });
  }

  private getTournamentByName() {
    return this.tournaments.find((d) => d.name === PERMANENT_TOURNAMENT);
  }
}
