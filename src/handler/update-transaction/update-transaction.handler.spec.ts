import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTransactionHandler } from './update-transaction.handler';
import { UpdateTransactionUseCase } from 'domain/usecase';
import { HTTPResponse, UpdateTransactionDTO } from 'src/model/dto';
import { HttpStatus } from '@nestjs/common';

describe('UpdateTransactionHandler', () => {
  let handler: UpdateTransactionHandler;
  let updateTransactionUseCase: UpdateTransactionUseCase;

  beforeEach(async () => {
    const mockUpdateTransactionUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionHandler,
        {
          provide: 'UpdateTransactionUseCase',
          useValue: mockUpdateTransactionUseCase,
        },
      ],
    }).compile();

    handler = module.get<UpdateTransactionHandler>(UpdateTransactionHandler);
    updateTransactionUseCase = module.get<UpdateTransactionUseCase>(
      'UpdateTransactionUseCase',
    );
  });

  it('should be defined', (): void => {
    expect(handler).toBeDefined();
  });

  it('execute should call updateTransactionUseCase.apply and return HTTPResponse', async (): Promise<void> => {
    const updateTransaction: UpdateTransactionDTO = {
      // fill with required properties as per DTO
    } as UpdateTransactionDTO;

    const useCaseResponse = {
      id: 'transaction-id',
      // other properties as needed
    };

    (updateTransactionUseCase.apply as jest.Mock).mockResolvedValue(
      useCaseResponse,
    );

    const result = await handler.execute(updateTransaction);

    expect(updateTransactionUseCase.apply).toHaveBeenCalledWith(
      updateTransaction,
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
