import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from './product.repository';
import { ProductEntity } from '../../entities';
import { Product } from 'domain/model';

describe('ProductRepository', () => {
  let repository: ProductRepository;
  let typeOrmRepository: jest.Mocked<Repository<ProductEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
    typeOrmRepository = module.get(getRepositoryToken(ProductEntity));
  });

  it('should return all products', async () => {
    const products = [{ id: 'prod1' } as ProductEntity] as ProductEntity[];
    typeOrmRepository.find.mockResolvedValue(products);

    const result = await repository.findAll();

    expect(typeOrmRepository.find).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  it('should throw error on findAll method error', async () => {
    typeOrmRepository.find.mockRejectedValue(new Error('DB error'));

    await expect(repository.findAll()).rejects.toThrow('Error in get products');
  });

  it('should return product stock by id', async () => {
    const product = { id: 'prod1' } as ProductEntity;
    typeOrmRepository.findOne.mockResolvedValue(product);

    const result = await repository.getProductsStock('prod1');

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'prod1' },
    });
    expect(result).toEqual(product);
  });

  it('should throw error if product not found', async () => {
    typeOrmRepository.findOne.mockResolvedValue(null);

    await expect(repository.getProductsStock('prod1')).rejects.toThrow(
      'Error in get product',
    );
  });

  it('should throw error on getProductsStock method error', async () => {
    typeOrmRepository.findOne.mockRejectedValue(
      new Error('Error in get product'),
    );

    await expect(repository.getProductsStock('prod1')).rejects.toThrow(
      'Error in get product',
    );
  });
});
