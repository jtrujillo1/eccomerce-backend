import { CreateOrderHandler } from './../../../../handler/create-order/create-order.handler';
import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { UpdateOrderStatusHandler } from 'src/handler/update-order-status/update-order-status.handler';
import { CreateOrderDto } from 'src/model/dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderHandler: CreateOrderHandler,
    private readonly updateOrderStatusOrderHandler: UpdateOrderStatusHandler,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.createOrderHandler.execute(createOrderDto);
  }

  @Patch(':id/status')
  async updateOrderStatus(@Param('id') id: string) {
    return await this.updateOrderStatusOrderHandler.execute(id);
  }
}
