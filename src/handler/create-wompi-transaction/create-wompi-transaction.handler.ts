import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WompiTransaction } from 'domain/model';
import { CreateWompiTransactionUseCase } from 'domain/usecase';
import { HTTPResponse } from 'src/model/dto';

@Injectable()
export class CreateWompiTransactionHandler {
  constructor(
    @Inject('CreateWompiTransactionUseCase')
    private readonly createWompiTransactionUseCase: CreateWompiTransactionUseCase,
  ) {}

  async execute(createWompiTransaction: WompiTransaction) {
    const response = await this.createWompiTransactionUseCase.apply(
      createWompiTransaction,
    );

    return new HTTPResponse(
      HttpStatus.OK,
      'OK',
      'Solicitud ejecutada correctamente',
      response,
    );
  }
}
