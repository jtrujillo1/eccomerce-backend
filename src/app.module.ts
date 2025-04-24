import { Logger, Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './adapter/out/database';
import { UserController } from './adapter/in/https';
import { GetUsersHandler } from './handler';
import { GetUsersUseCase } from 'domain/usecase';
import { UserRepository } from './adapter/out/database/repositories';

@Module({
  imports: [CommonModule, DatabaseModule],
  controllers: [UserController],
  providers: [
    GetUsersHandler,
    {
      provide: 'GetUsersUseCase',
      useFactory: (userRepository: UserRepository) => {
        return new GetUsersUseCase(userRepository, Logger);
      },
      inject: [UserRepository],
    },
  ],
  exports: [GetUsersHandler],
})
export class AppModule {}
