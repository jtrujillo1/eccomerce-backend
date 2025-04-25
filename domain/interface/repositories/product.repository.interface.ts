import { Product } from 'domain/model';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  getProductsStock(id: string): Promise<Product>;
}
