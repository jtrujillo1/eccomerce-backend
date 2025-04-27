import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionHandler } from './create-transaction.handler';
import { CreateTransactionUseCase } from 'domain/usecase/create-transaction/create-transaction.usecase';
import { HTTPResponse } from 'src/model/dto';
import { HttpStatus } from '@nestjs/common';

describe('CreateTransactionHandler', () => {
  let handler: CreateTransactionHandler;
  let createTransactionUseCase: CreateTransactionUseCase;

  beforeEach(async () => {
    const mockCreateTransactionUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionHandler,
        {
          provide: 'CreateTransactionUseCase',
          useValue: mockCreateTransactionUseCase,
        },
      ],
    }).compile();

    handler = module.get<CreateTransactionHandler>(CreateTransactionHandler);
    createTransactionUseCase = module.get<CreateTransactionUseCase>(
      'CreateTransactionUseCase',
    );
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('execute should call createTransactionUseCase.apply and return HTTPResponse', async () => {
    const orderId = 'order-id';

    const useCaseResponse = {
      id: 'transaction-id',
      // other properties as needed
    };

    (createTransactionUseCase.apply as jest.Mock).mockResolvedValue(
      useCaseResponse,
    );

    const result = await handler.execute(orderId);

    expect(createTransactionUseCase.apply).toHaveBeenCalledWith(orderId);
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
