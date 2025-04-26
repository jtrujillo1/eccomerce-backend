import { Inject, Injectable } from '@nestjs/common';
import { FindOrCreateUserUseCase } from 'domain/usecase';
import { GetUserByEmailDto } from 'src/model/dto';

@Injectable()
export class FindOrCreateUserHandler {
  constructor(
    @Inject('FindOrCreateUserUseCase')
    private readonly findOrCreateUserUseCase: FindOrCreateUserUseCase,
  ) {}

  async execute(
    createUser: GetUserByEmailDto,
  ): Promise<{ id: string; status: number }> {
    return await this.findOrCreateUserUseCase.apply(createUser);
  }
}
