import { IsArray, IsString } from 'class-validator';
import { ItemDto } from './item.dto';

export class CreateOrderDto {
  @IsString()
  user_id: string;

  @IsArray()
  items: ItemDto[];
}
