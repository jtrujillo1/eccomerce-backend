import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'domain/model';
import { Repository } from 'typeorm';
import { IProductRepository } from 'domain/interface';

import { ProductEntity } from '../../entities';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new Error('Error in get products', error as Error);
    }
  }

  async getProductsStock(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product) throw new Error('Product with id ${id} not exist');

      return product;
    } catch (error) {
      throw new Error('Error in get product', error as Error);
    }
  }
}
