import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WompiService } from './wompi.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      baseURL: process.env.WOMPI_BASE_URL!,
    }),
  ],
  providers: [WompiService],
  exports: [WompiService],
})
export class WompiModule {}
