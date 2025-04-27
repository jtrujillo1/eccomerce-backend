import { Test, TestingModule } from '@nestjs/testing';
import { GetAcceptanceTokenHandler } from './get-acceptance-token.handler';
import { GetAcceptanceTokenUseCase } from 'domain/usecase';
import { HTTPResponse } from 'src/model/dto';
import { HttpStatus } from '@nestjs/common';

describe('GetAcceptanceTokenHandler', () => {
  let handler: GetAcceptanceTokenHandler;
  let getAcceptanceTokenUseCase: GetAcceptanceTokenUseCase;

  beforeEach(async () => {
    const mockGetAcceptanceTokenUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAcceptanceTokenHandler,
        {
          provide: 'GetAcceptanceTokenUseCase',
          useValue: mockGetAcceptanceTokenUseCase,
        },
      ],
    }).compile();

    handler = module.get<GetAcceptanceTokenHandler>(GetAcceptanceTokenHandler);
    getAcceptanceTokenUseCase = module.get<GetAcceptanceTokenUseCase>('GetAcceptanceTokenUseCase');
  });

  it('should be defined', (): void => {
    expect(handler).toBeDefined();
  });

  it('execute should call getAcceptanceTokenUseCase.apply and return HTTPResponse', async (): Promise<void> => {
    const useCaseResponse = {
      token: 'token-value',
      // other properties as needed
    };

    (getAcceptanceTokenUseCase.apply as jest.Mock).mockResolvedValue(useCaseResponse);

    const result = await handler.execute();

    expect(getAcceptanceTokenUseCase.apply).toHaveBeenCalled();
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
