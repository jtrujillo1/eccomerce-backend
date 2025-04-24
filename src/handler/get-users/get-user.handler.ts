import { Inject, Injectable } from '@nestjs/common';
import { User } from 'domain/model';
import { GetUsersUseCase } from 'domain/usecase';

@Injectable()
export class GetUsersHandler {
  constructor(
    @Inject('GetUsersUseCase')
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  async execute(): Promise<User[]> {
    return await this.getUsersUseCase.apply();
  }
}
