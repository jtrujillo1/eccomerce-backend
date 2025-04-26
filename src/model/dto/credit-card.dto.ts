import { IsString } from 'class-validator';
import { CreditCard } from 'domain/model';

export class CreditCardDTO implements CreditCard {
  @IsString()
  number: string;

  @IsString()
  cvc: string;

  @IsString()
  month: string;

  @IsString()
  year: string;

  @IsString()
  cardHolder: string;
}
