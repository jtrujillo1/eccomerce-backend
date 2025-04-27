import { Test, TestingModule } from '@nestjs/testing';
import { TokenizeCardHandler } from './tokenize-card.handler';
import { TokenizeCardUseCase } from 'domain/usecase';
import { HTTPResponse } from 'src/model/dto';
import { CreditCardDTO } from 'src/model/dto/credit-card.dto';
import { HttpStatus } from '@nestjs/common';

describe('TokenizeCardHandler', () => {
  let handler: TokenizeCardHandler;
  let tokenizeCardUseCase: TokenizeCardUseCase;

  beforeEach(async () => {
    const mockTokenizeCardUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenizeCardHandler,
        {
          provide: 'TokenizeCardUseCase',
          useValue: mockTokenizeCardUseCase,
        },
      ],
    }).compile();

    handler = module.get<TokenizeCardHandler>(TokenizeCardHandler);
    tokenizeCardUseCase = module.get<TokenizeCardUseCase>(
      'TokenizeCardUseCase',
    );
  });

  it('should be defined', (): void => {
    expect(handler).toBeDefined();
  });

  it('execute should call tokenizeCardUseCase.apply and return HTTPResponse', async (): Promise<void> => {
    const creditCard: CreditCardDTO = {
      // fill with required properties as per DTO
    } as CreditCardDTO;

    const useCaseResponse = {
      token: 'token-value',
      // other properties as needed
    };

    (tokenizeCardUseCase.apply as jest.Mock).mockResolvedValue(useCaseResponse);

    const result = await handler.execute(creditCard);

    expect(tokenizeCardUseCase.apply).toHaveBeenCalledWith(creditCard);
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
