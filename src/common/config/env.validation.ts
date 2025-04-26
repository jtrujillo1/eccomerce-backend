import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

class EnviromentVariables {
  @IsNumber()
  @IsOptional()
  PORT!: number;

  @IsString()
  DB_HOST!: string;

  @IsNumber()
  DB_PORT!: number;

  @IsString()
  DB_USERNAME!: string;

  @IsString()
  DB_NAME!: string;

  @IsString()
  DB_PASSWORD!: string;

  @IsString()
  WOMPI_BASE_URL!: string;

  @IsString()
  WOMPI_PUBLIC_KEY!: string;

  @IsString()
  WOMPI_PRIVATE_KEY!: string;

  @IsString()
  WOMPI_INTEGRITY_KEY!: string;
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
