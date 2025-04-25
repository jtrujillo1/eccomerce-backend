import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Product } from 'domain/model';
import {
  CalculateSubtotaldHandler,
  GetProductsByIdHandler,
  GetProductsHandler,
} from 'src/handler';
import { ItemDto } from 'src/model/dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly calculateSubtotalHandler: CalculateSubtotaldHandler,
    private readonly getProductsByIdHandler: GetProductsByIdHandler,
    private readonly GetProductsHandler: GetProductsHandler,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.GetProductsHandler.execute();
  }

  @Get(':id/stock')
  async getProductStock(@Param('id') id: string) {
    return await this.getProductsByIdHandler.execute(id);
  }

  @Post('calculate')
  async calculateSubtotal(@Body('items') items: ItemDto[]) {
    return await this.calculateSubtotalHandler.execute(items);
  }
}
