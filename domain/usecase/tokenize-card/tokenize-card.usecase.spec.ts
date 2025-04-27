import { CreditCard } from 'domain/model';
import { TokenizeCardUseCase } from './tokenize-card.usecase';
import { ILogger, IWompiService } from 'domain/interface';

describe('TokenizeCardUseCase', () => {
  let useCase: TokenizeCardUseCase;
  let cardService: jest.Mocked<IWompiService>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    cardService = {
      createWompiTransaction: jest.fn(),
      getAcceptanceToken: jest.fn(),
      tokenizeCard: jest.fn(),
    } as jest.Mocked<IWompiService>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new TokenizeCardUseCase(cardService, logger);
  });

  it('should tokenize card and return token', async () => {
    const cardData = {
      number: '4111111111111111',
      month: '12',
      year: '2025',
      cvc: '123',
      cardHolder: 'sa',
    } as CreditCard;
    const token = 'token123';

    cardService.tokenizeCard.mockResolvedValue(token);

    const result = await useCase.apply(cardData);

    expect(cardService.tokenizeCard).toHaveBeenCalledWith(cardData);
    expect(result).toEqual(token);
  });
});
