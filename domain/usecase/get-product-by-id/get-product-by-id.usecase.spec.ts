import { GetProductsByIdUseCase } from './get-product-by-id.usecase';
import { IProductRepository, ILogger } from 'domain/interface';
import { Product } from 'domain/model';

describe('GetProductsByIdUseCase', () => {
  let useCase: GetProductsByIdUseCase;
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

    useCase = new GetProductsByIdUseCase(productRepository, logger);
  });

  it('should return product by id', async () => {
    const productId = 'product-1';
    const product: Product = {
      id: productId,
      name: 'Product 1',
      description: 'Description 1',
      stock: 10,
      amountInCents: 1000,
    } as Product;

    productRepository.getProductsStock.mockResolvedValue(product);

    const result = await useCase.apply(productId);

    expect(productRepository.getProductsStock).toHaveBeenCalledWith(productId);
    expect(result).toEqual(product);
  });
});
