import { IsNumber, IsString } from 'class-validator';
import { Item } from 'domain/model';

export class ItemDto implements Item {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}
