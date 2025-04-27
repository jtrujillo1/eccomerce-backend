import { HttpStatus, Inject } from '@nestjs/common';
import { UpdateTransactionUseCase } from 'domain/usecase';
import { HTTPResponse, UpdateTransactionDTO } from 'src/model/dto';

export class UpdateTransactionHandler {
  constructor(
    @Inject('UpdateTransactionUseCase')
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
  ) {}

  async execute(updateTransaction: UpdateTransactionDTO) {
    const response =
      await this.updateTransactionUseCase.apply(updateTransaction);

    return new HTTPResponse(
      HttpStatus.OK,
      'OK',
      'Solicitud ejecutada correctamente',
      response,
    );
  }
}
