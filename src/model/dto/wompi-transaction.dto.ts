import { IsString } from 'class-validator';
import { WompiTransaction } from 'domain/model';

export class WompiTransactionDTO implements WompiTransaction {
  @IsString()
  reference: string;

  @IsString()
  installments: number;

  @IsString()
  acceptance_token: string;

  @IsString()
  id_tokenizacion: string;
}
