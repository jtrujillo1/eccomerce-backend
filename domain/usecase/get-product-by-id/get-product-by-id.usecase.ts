import { ILogger, IProductRepository } from 'domain/interface';

export class GetProductsByIdUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly logger: ILogger,
  ) {}

  async apply(id: string) {
    return await this.productRepository.getProductsStock(id);
  }
}
