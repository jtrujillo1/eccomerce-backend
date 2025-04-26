import { CreditCard } from 'domain/model';
import { ILogger, IWompiService } from 'domain/interface';

export class TokenizeCardUseCase {
  constructor(
    private readonly wompiService: IWompiService,
    private readonly logger: ILogger,
  ) {}

  async apply(creditCard: CreditCard) {
    const data = await this.wompiService.tokenizeCard(creditCard);

    return data;
  }
}
