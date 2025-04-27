import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderHandler } from './create-order.handler';
import { CreateOrderUseCase } from 'domain/usecase';
import { CreateOrderDto, HTTPResponse } from 'src/model/dto';
import { HttpStatus } from '@nestjs/common';

describe('CreateOrderHandler', () => {
  let handler: CreateOrderHandler;
  let createOrderUseCase: CreateOrderUseCase;

  beforeEach(async () => {
    const mockCreateOrderUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderHandler,
        {
          provide: 'CreateOrderUseCase',
          useValue: mockCreateOrderUseCase,
        },
      ],
    }).compile();

    handler = module.get<CreateOrderHandler>(CreateOrderHandler);
    createOrderUseCase = module.get<CreateOrderUseCase>('CreateOrderUseCase');
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('execute should call createOrderUseCase.apply and return HTTPResponse', async () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'user-id',
      items: [],
    };

    const useCaseResponse = {
      id: 'order-id',
      // other properties as needed
    };

    (createOrderUseCase.apply as jest.Mock).mockResolvedValue(useCaseResponse);

    const result = await handler.execute(createOrderDto);

    expect(createOrderUseCase.apply).toHaveBeenCalledWith(
      createOrderDto.userId,
      createOrderDto.items,
    );
    expect(result).toEqual(
      new HTTPResponse(
        HttpStatus.OK,
        'OK',
        'Solicitud ejecutada correctamente',
        useCaseResponse,
      ),
    );
  });
});
