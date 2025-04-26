import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTransactionUseCase } from 'domain/usecase/create-transaction/create-transaction.usecase';
import { HTTPResponse } from 'src/model/dto';

@Injectable()
export class CreateTransactionHandler {
  constructor(
    @Inject('CreateTransactionUseCase')
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  async execute(orderId: string) {
    const response = await this.createTransactionUseCase.apply(orderId);
    return new HTTPResponse(
      HttpStatus.OK,
      'OK',
      'Solicitud ejecutada correctamente',
      response,
    );
  }
}
