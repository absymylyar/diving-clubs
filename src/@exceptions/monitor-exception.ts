import { HttpException } from '@nestjs/common';

export class MonitorException extends HttpException {
  constructor() {
    super("Le moniteur n'a pas le niveau minimum requis", 410);
  }
}
