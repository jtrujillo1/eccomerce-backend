import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderUseCase } from 'domain/usecase';
import { CreateOrderDto, HTTPResponse } from 'src/model/dto';

@Injectable()
export class CreateOrderHandler {
  constructor(
    @Inject('CreateOrderUseCase')
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  async execute(createOrderDto: CreateOrderDto) {
    const response = await this.createOrderUseCase.apply(
      createOrderDto.userId,
      createOrderDto.items,
    );

    return new HTTPResponse(
      HttpStatus.OK,
      'OK',
      'Solicitud ejecutada correctamente',
      response,
    );
  }
}
