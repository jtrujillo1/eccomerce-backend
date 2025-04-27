import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateWompiTransactionUseCase } from 'domain/usecase';
import { HTTPResponse, WompiTransactionDTO } from 'src/model/dto';

@Injectable()
export class CreateWompiTransactionHandler {
  constructor(
    @Inject('CreateWompiTransactionUseCase')
    private readonly createWompiTransactionUseCase: CreateWompiTransactionUseCase,
  ) {}

  async execute(createWompiTransaction: WompiTransactionDTO) {
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
