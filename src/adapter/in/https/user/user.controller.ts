import { Controller, Get } from '@nestjs/common';
import { User } from 'domain/model';
import { GetUsersHandler } from 'src/handler';

@Controller('user')
export class UserController {
  constructor(private readonly getUserHandler: GetUsersHandler) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.getUserHandler.execute();
  }
}
