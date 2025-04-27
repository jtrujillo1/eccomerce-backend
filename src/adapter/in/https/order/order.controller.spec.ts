import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CreateOrderHandler } from '../../../../handler/create-order/create-order.handler';
import { UpdateOrderStatusHandler } from 'src/handler/update-order-status/update-order-status.handler';
import { CreateOrderDto, HTTPResponse } from 'src/model/dto';
import { Order } from 'domain/model';

describe('OrderController', () => {
  let controller: OrderController;
  let createOrderHandler: CreateOrderHandler;
  let updateOrderStatusHandler: UpdateOrderStatusHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: CreateOrderHandler,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateOrderStatusHandler,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    createOrderHandler = module.get<CreateOrderHandler>(CreateOrderHandler);
    updateOrderStatusHandler = module.get<UpdateOrderStatusHandler>(
      UpdateOrderStatusHandler,
    );
  });

  describe('createOrder', () => {
    it('should call createOrderHandler.execute and return result', async () => {
      const dto: CreateOrderDto = {} as CreateOrderDto;

      const order: Order = {} as Order;

      const response: HTTPResponse<Order> = {
        data: order,
        status: 201,
        message: 'Order created',
        code: '',
      };

      (createOrderHandler.execute as jest.Mock).mockResolvedValue(response);

      const result = await controller.createOrder(dto);

      expect(createOrderHandler.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(response);
    });
  });

  describe('updateOrderStatus', () => {
    it('should call updateOrderStatusHandler.execute and return result', async () => {
      const id = 'order-id';

      const response = {
        success: true,
      };

      (updateOrderStatusHandler.execute as jest.Mock).mockResolvedValue(
        response,
      );

      const result = await controller.updateOrderStatus(id);

      expect(updateOrderStatusHandler.execute).toHaveBeenCalledWith(id);
      expect(result).toEqual(response);
    });
  });
});
