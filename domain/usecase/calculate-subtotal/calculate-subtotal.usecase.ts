import { ILogger, IProductRepository } from 'domain/interface';
import { Item } from 'domain/model';

export class CalculateSubtotalUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly logger: ILogger,
  ) {}

  async apply(items: Item[]): Promise<number> {
    const products = await Promise.all(
      items.map((item) =>
        this.productRepository.getProductsStock(item.productId),
      ),
    );

    const total = products.reduce((acc, product, index) => {
      const quantity = items[index].quantity;
      return acc + product.amountInCents * quantity;
    }, 0);

    return total;
  }
}
