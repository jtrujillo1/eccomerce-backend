import { CalculateSubtotalUseCase } from './calculate-subtotal.usecase';
import { IProductRepository, ILogger } from 'domain/interface';
import { Item, Product } from 'domain/model';

describe('CalculateSubtotalUseCase', () => {
  let useCase: CalculateSubtotalUseCase;
  let productRepository: jest.Mocked<IProductRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    productRepository = {
      getProductsStock: jest.fn(),
    } as unknown as jest.Mocked<IProductRepository>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new CalculateSubtotalUseCase(productRepository, logger);
  });

  it('should calculate total correctly', async () => {
    const items: Item[] = [
      { productId: 'p1', quantity: 2 },
      { productId: 'p2', quantity: 3 },
    ];

    productRepository.getProductsStock.mockImplementation(
      async (productId: string) => {
        if (productId === 'p1') {
          return { amountInCents: 1000 } as Product;
        }
        if (productId === 'p2') {
          return { amountInCents: 2000 } as Product;
        }
        return { amountInCents: 0 } as Product;
      },
    );

    const result = await useCase.apply(items);

    expect(productRepository.getProductsStock).toHaveBeenCalledTimes(
      items.length,
    );
    expect(result.total).toBe(2 * 1000 + 3 * 2000);
  });
});
