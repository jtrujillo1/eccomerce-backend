import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsNumber, IsOptional, validateSync } from 'class-validator';

class EnviromentVariables {
  @IsNumber()
  @IsOptional()
  PORT!: number;
}

export function validate(config: Record<string, unknown>) {
  const validateConfig = plainToClass(EnviromentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const variables = errors.map((error) => error.property);
    Logger.error('Configuration error.', variables);

    throw new Error(
      'You do not have the necessary configuration to run the microservice.',
    );
  }

  return validateConfig;
}
