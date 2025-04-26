import { ILogger, IWompiService } from 'domain/interface';

export class GetAcceptanceTokenUseCase {
  constructor(
    private readonly wompiService: IWompiService,
    private readonly logger: ILogger,
  ) {}

  async apply() {
    const data = await this.wompiService.getAcceptanceToken();

    return data;
  }
}
