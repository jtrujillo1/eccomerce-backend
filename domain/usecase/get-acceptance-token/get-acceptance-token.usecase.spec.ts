import { AcceptanceToken } from 'domain/model';
import { GetAcceptanceTokenUseCase } from './get-acceptance-token.usecase';
import { IWompiService, ILogger } from 'domain/interface';

describe('GetAcceptanceTokenUseCase', () => {
  let useCase: GetAcceptanceTokenUseCase;
  let wompiService: jest.Mocked<IWompiService>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    wompiService = {
      getAcceptanceToken: jest.fn(),
    } as unknown as jest.Mocked<IWompiService>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new GetAcceptanceTokenUseCase(wompiService, logger);
  });

  it('should return acceptance token data', async () => {
    wompiService.getAcceptanceToken.mockResolvedValue({
      acceptance_token: 'dummy',
    } as AcceptanceToken);

    const result = await useCase.apply();

    expect(wompiService.getAcceptanceToken).toHaveBeenCalled();
    expect(result).toEqual({ acceptance_token: 'dummy' });
  });
});
