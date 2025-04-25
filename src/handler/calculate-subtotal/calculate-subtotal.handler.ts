import { Inject, Injectable } from '@nestjs/common';
import { CalculateSubtotalUseCase } from 'domain/usecase';
import { ItemDto } from 'src/model/dto';

@Injectable()
export class CalculateSubtotaldHandler {
  constructor(
    @Inject('CalculateSubtotalUseCase')
    private readonly calculateSubtotalUseCase: CalculateSubtotalUseCase,
  ) {}

  async execute(items: ItemDto[]): Promise<number> {
    return await this.calculateSubtotalUseCase.apply(items);
  }
}
