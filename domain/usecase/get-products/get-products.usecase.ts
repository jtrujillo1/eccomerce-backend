import { ILogger, IProductRepository } from 'domain/interface';

export class GetProductsUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly logger: ILogger,
  ) {}

  async apply() {
    return await this.productRepository.findAll();
  }
}
