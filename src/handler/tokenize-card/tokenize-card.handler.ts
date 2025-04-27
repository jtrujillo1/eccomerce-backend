import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TokenizeCardUseCase } from 'domain/usecase';
import { HTTPResponse } from 'src/model/dto';
import { CreditCardDTO } from 'src/model/dto/credit-card.dto';

@Injectable()
export class TokenizeCardHandler {
  constructor(
    @Inject('TokenizeCardUseCase')
    private readonly tokenizeCardUseCase: TokenizeCardUseCase,
  ) {}

  async execute(creditCard: CreditCardDTO) {
    const response = await this.tokenizeCardUseCase.apply(creditCard);

    return new HTTPResponse(
      HttpStatus.OK,
      'OK',
      'Solicitud ejecutada correctamente',
      response,
    );
  }
}
