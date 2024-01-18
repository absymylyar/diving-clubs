import { HttpException } from '@nestjs/common';
export enum DiverExceptionType {
  MissingLicence = 411,
  MissingRank = 412,
}
const messages: { [code: number]: string } = {
  [DiverExceptionType.MissingLicence]: 'Diver missing licence',
  [DiverExceptionType.MissingRank]: 'Diver missing rank',
};
export class DiverException extends HttpException {
  constructor(type: DiverExceptionType) {
    super(messages[type], type);
  }
}
