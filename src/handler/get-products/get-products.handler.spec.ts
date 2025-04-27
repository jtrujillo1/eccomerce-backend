import { Test, TestingModule } from '@nestjs/testing';
import { GetProductsHandler } from './get-products.handler';
import { GetProductsUseCase } from 'domain/usecase';
import { Product } from 'domain/model';

describe('GetProductsHandler', () => {
  let handler: GetProductsHandler;
  let getProductsUseCase: GetProductsUseCase;

  beforeEach(async () => {
    const mockGetProductsUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProductsHandler,
        {
          provide: 'GetProductsUseCase',
          useValue: mockGetProductsUseCase,
        },
      ],
    }).compile();

    handler = module.get<GetProductsHandler>(GetProductsHandler);
    getProductsUseCase = module.get<GetProductsUseCase>('GetProductsUseCase');
  });

  it('should be defined', (): void => {
    expect(handler).toBeDefined();
  });

  it('execute should call getProductsUseCase.apply and return products', async (): Promise<void> => {
    const products: Product[] = [
      {
        id: 'product-1',
        name: 'Product 1',
        // other properties as needed
      } as Product,
      {
        id: 'product-2',
        name: 'Product 2',
        // other properties as needed
      } as Product,
    ];

    (getProductsUseCase.apply as jest.Mock).mockResolvedValue(products);

    const result = await handler.execute();

    expect(getProductsUseCase.apply).toHaveBeenCalled();
    expect(result).toEqual(products);
  });
});
