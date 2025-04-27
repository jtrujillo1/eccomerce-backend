import { GetProductsUseCase } from './get-products.usecase';
import { IProductRepository, ILogger } from 'domain/interface';
import { Product } from 'domain/model';

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;
  let productRepository: jest.Mocked<IProductRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    productRepository = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<IProductRepository>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new GetProductsUseCase(productRepository, logger);
  });

  it('should return all products', async () => {
    const products: Product[] = [
      {
        id: 'product-1',
        name: 'Product 1',
        description: 'Description 1',
        stock: 10,
        amountInCents: 1000,
      } as Product,
      {
        id: 'product-2',
        name: 'Product 2',
        description: 'Description 2',
        stock: 5,
        amountInCents: 2000,
      } as Product,
    ];

    productRepository.findAll.mockResolvedValue(products);

    const result = await useCase.apply();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(products);
  });
});
