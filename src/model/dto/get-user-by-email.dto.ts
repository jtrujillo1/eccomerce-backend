import { IsEmail } from 'class-validator';
import { GetUserByEmail } from 'domain/model';

export class GetUserByEmailDto implements GetUserByEmail {
  @IsEmail()
  email: string;
}
