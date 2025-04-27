import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import {
  CalculateSubtotaldHandler,
  GetProductsByIdHandler,
  GetProductsHandler,
} from 'src/handler';
import { Product } from 'domain/model';
import { ItemDto } from 'src/model/dto';

describe('ProductController', () => {
  let controller: ProductController;
  let calculateSubtotalHandler: CalculateSubtotaldHandler;
  let getProductsByIdHandler: GetProductsByIdHandler;
  let getProductsHandler: GetProductsHandler;

  const handlerMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CalculateSubtotaldHandler,
          useValue: handlerMock,
        },
        {
          provide: GetProductsByIdHandler,
          useValue: handlerMock,
        },
        {
          provide: GetProductsHandler,
          useValue: handlerMock,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    calculateSubtotalHandler = module.get<CalculateSubtotaldHandler>(
      CalculateSubtotaldHandler,
    );
    getProductsByIdHandler = module.get<GetProductsByIdHandler>(
      GetProductsByIdHandler,
    );
    getProductsHandler = module.get<GetProductsHandler>(GetProductsHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          stock: 5,
          urlImg: 'http://example.com/img1.jpg',
          amountInCents: 10000,
          orderItem: [],
        } as Product,
      ];

      jest.spyOn(getProductsHandler, 'execute').mockResolvedValue(products);

      expect(await controller.findAll()).toBe(products);
    });
  });

  describe('getProductStock', () => {
    it('should return product stock by id', async () => {
      const productId = '1';
      const product: Product = {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        stock: 10,
        urlImg: 'http://example.com/img1.jpg',
        amountInCents: 10000,
        orderItem: [],
      };

      jest.spyOn(getProductsByIdHandler, 'execute').mockResolvedValue(product);

      expect(await controller.getProductStock(productId)).toBe(product);
    });
  });

  describe('calculateSubtotal', () => {
    it('should return subtotal for given items', async () => {
      const items: ItemDto[] = [{ productId: '1', quantity: 2 }];

      const subtotal = { total: 200 };

      jest
        .spyOn(calculateSubtotalHandler, 'execute')
        .mockResolvedValue(subtotal);

      expect(await controller.calculateSubtotal(items)).toBe(subtotal);
    });
  });
});
