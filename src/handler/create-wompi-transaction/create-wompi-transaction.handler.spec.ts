import { Test, TestingModule } from '@nestjs/testing';
import { CreateWompiTransactionHandler } from './create-wompi-transaction.handler';
import { CreateWompiTransactionUseCase } from 'domain/usecase';
import { HTTPResponse, WompiTransactionDTO } from 'src/model/dto';
import { HttpStatus } from '@nestjs/common';

describe('CreateWompiTransactionHandler', () => {
  let handler: CreateWompiTransactionHandler;
  let createWompiTransactionUseCase: CreateWompiTransactionUseCase;

  beforeEach(async () => {
    const mockCreateWompiTransactionUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateWompiTransactionHandler,
        {
          provide: 'CreateWompiTransactionUseCase',
          useValue: mockCreateWompiTransactionUseCase,
        },
      ],
    }).compile();

    handler = module.get<CreateWompiTransactionHandler>(
      CreateWompiTransactionHandler,
    );
    createWompiTransactionUseCase = module.get<CreateWompiTransactionUseCase>(
      'CreateWompiTransactionUseCase',
    );
  });

  it('should be defined', (): void => {
    expect(handler).toBeDefined();
  });

  it('execute should call createWompiTransactionUseCase.apply and return HTTPResponse', async (): Promise<void> => {
    const createWompiTransaction: WompiTransactionDTO = {
      // fill with required properties as per DTO
    } as WompiTransactionDTO;

    const useCaseResponse = {
      id: 'transaction-id',
      // other properties as needed
    };

    (createWompiTransactionUseCase.apply as jest.Mock).mockResolvedValue(
      useCaseResponse,
    );

    const result = await handler.execute(createWompiTransaction);

    expect(createWompiTransactionUseCase.apply).toHaveBeenCalledWith(
      createWompiTransaction,
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
