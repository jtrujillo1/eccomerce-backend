import { Test, TestingModule } from '@nestjs/testing';
import { UpdateOrderStatusHandler } from './update-order-status.handler';
import { UpdateOrderStatusUseCase } from 'domain/usecase';
import { Order } from 'domain/model';

describe('UpdateOrderStatusHandler', () => {
  let handler: UpdateOrderStatusHandler;
  let updateOrderStatusUseCase: UpdateOrderStatusUseCase;

  beforeEach(async () => {
    const mockUpdateOrderStatusUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateOrderStatusHandler,
        {
          provide: 'UpdateOrderStatusUseCase',
          useValue: mockUpdateOrderStatusUseCase,
        },
      ],
    }).compile();

    handler = module.get<UpdateOrderStatusHandler>(UpdateOrderStatusHandler);
    updateOrderStatusUseCase = module.get<UpdateOrderStatusUseCase>(
      'UpdateOrderStatusUseCase',
    );
  });

  it('should be defined', (): void => {
    expect(handler).toBeDefined();
  });

  it('execute should call updateOrderStatusUseCase.apply and return order', async (): Promise<void> => {
    const id = 'order-id';

    const order: Order = {
      id: 'order-id',
      // other properties as needed
    } as Order;

    (updateOrderStatusUseCase.apply as jest.Mock).mockResolvedValue(order);

    const result = await handler.execute(id);

    expect(updateOrderStatusUseCase.apply).toHaveBeenCalledWith(id);
    expect(result).toEqual(order);
  });
});
