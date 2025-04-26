import { IsArray, IsString } from 'class-validator';
import { ItemDto } from './item.dto';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  items: ItemDto[];
}
