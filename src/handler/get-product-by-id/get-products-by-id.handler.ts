import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'domain/model';
import { GetProductsByIdUseCase } from 'domain/usecase';

@Injectable()
export class GetProductsByIdHandler {
  constructor(
    @Inject('GetProductsByIdUseCase')
    private readonly getProductsByIdUseCase: GetProductsByIdUseCase,
  ) {}

  async execute(id: string): Promise<Product> {
    return await this.getProductsByIdUseCase.apply(id);
  }
}
