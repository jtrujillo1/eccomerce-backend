import { Test, TestingModule } from '@nestjs/testing';
import { GetProductsByIdHandler } from './get-products-by-id.handler';
import { GetProductsByIdUseCase } from 'domain/usecase';
import { Product } from 'domain/model';

describe('GetProductsByIdHandler', () => {
  let handler: GetProductsByIdHandler;
  let getProductsByIdUseCase: GetProductsByIdUseCase;

  beforeEach(async () => {
    const mockGetProductsByIdUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProductsByIdHandler,
        {
          provide: 'GetProductsByIdUseCase',
          useValue: mockGetProductsByIdUseCase,
        },
      ],
    }).compile();

    handler = module.get<GetProductsByIdHandler>(GetProductsByIdHandler);
    getProductsByIdUseCase = module.get<GetProductsByIdUseCase>(
      'GetProductsByIdUseCase',
    );
  });

  it('should be defined', (): void => {
    expect(handler).toBeDefined();
  });

  it('execute should call getProductsByIdUseCase.apply and return product', async (): Promise<void> => {
    const id = 'product-id';

    const product: Product = {
      id: 'product-id',
      name: 'Product Name',
      // other properties as needed
    } as Product;

    (getProductsByIdUseCase.apply as jest.Mock).mockResolvedValue(product);

    const result = await handler.execute(id);

    expect(getProductsByIdUseCase.apply).toHaveBeenCalledWith(id);
    expect(result).toEqual(product);
  });
});
