import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'domain/model';
import { GetProductsUseCase } from 'domain/usecase';

@Injectable()
export class GetProductsHandler {
  constructor(
    @Inject('GetProductsUseCase')
    private readonly getProductsUseCase: GetProductsUseCase,
  ) {}

  async execute(): Promise<Product[]> {
    return await this.getProductsUseCase.apply();
  }
}
