import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiWsService {
  getHello(): string {
    return 'Hello World from websockets';
  }
}
