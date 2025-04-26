import { FindOrCreateUserHandler } from './../../../../handler/find-or-create-user/find-or-create-user.handler';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'domain/model';
import { GetUsersHandler } from 'src/handler';
import { GetUserByEmailDto } from 'src/model/dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly getUserHandler: GetUsersHandler,
    private readonly findOrCreateUserHandler: FindOrCreateUserHandler,
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.getUserHandler.execute();
  }

  @Post()
  async createUser(
    @Body() getUserByEmailDto: GetUserByEmailDto,
  ): Promise<{ id: string; status: number }> {
    return this.findOrCreateUserHandler.execute(getUserByEmailDto);
  }
}
