import { IsString } from 'class-validator';
import { UpdateTransaction } from 'domain/model';

export class UpdateTransactionDTO implements UpdateTransaction {
  @IsString()
  reference: string;

  @IsString()
  type: string;

  @IsString()
  finalized_at: string;

  @IsString()
  brand: string;

  @IsString()
  id: string;

  @IsString()
  status: string;
}
