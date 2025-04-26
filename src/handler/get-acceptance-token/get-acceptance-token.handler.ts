import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GetAcceptanceTokenUseCase } from 'domain/usecase';
import { HTTPResponse } from 'src/model/dto';

@Injectable()
export class GetAcceptanceTokenHandler {
  constructor(
    @Inject('GetAcceptanceTokenUseCase')
    private readonly getAcceptanceTokenUseCase: GetAcceptanceTokenUseCase,
  ) {}

  async execute() {
    const response = await this.getAcceptanceTokenUseCase.apply();

    return new HTTPResponse(
      HttpStatus.OK,
      'OK',
      'Solicitud ejecutada correctamente',
      response,
    );
  }
}
