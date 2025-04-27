import { Test, TestingModule } from '@nestjs/testing';
import { CalculateSubtotaldHandler } from './calculate-subtotal.handler';
import { CalculateSubtotalUseCase } from 'domain/usecase';
import { ItemDto } from 'src/model/dto';

describe('CalculateSubtotaldHandler', () => {
  let handler: CalculateSubtotaldHandler;
  let calculateSubtotalUseCase: CalculateSubtotalUseCase;

  beforeEach(async () => {
    const mockCalculateSubtotalUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculateSubtotaldHandler,
        {
          provide: 'CalculateSubtotalUseCase',
          useValue: mockCalculateSubtotalUseCase,
        },
      ],
    }).compile();

    handler = module.get<CalculateSubtotaldHandler>(CalculateSubtotaldHandler);
    calculateSubtotalUseCase = module.get<CalculateSubtotalUseCase>(
      'CalculateSubtotalUseCase',
    );
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('execute should call calculateSubtotalUseCase.apply and return total', async () => {
    const items: ItemDto[] = [{} as ItemDto];

    const totalResult = { total: 100 };

    (calculateSubtotalUseCase.apply as jest.Mock).mockResolvedValue(
      totalResult,
    );

    const result = await handler.execute(items);

    expect(calculateSubtotalUseCase.apply).toHaveBeenCalledWith(items);
    expect(result).toEqual(totalResult);
  });
});
