import { Controller, Post, Param } from '@nestjs/common';
import { Pay } from 'domain/model';
import { CreateTransactionHandler } from 'src/handler';
import { HTTPResponse } from 'src/model/dto';
// import { PayService } from './pay.service';

@Controller('pay')
export class PayController {
  constructor(
    private readonly createTransactionHandler: CreateTransactionHandler,
  ) {}
  @Post('createTransaction/:orderId')
  async createTransaction(
    @Param('orderId') orderId: string,
  ): Promise<HTTPResponse<Pay>> {
    return this.createTransactionHandler.execute(orderId);
  }

  //   @Get('getAcceptanceToken')
  //   async getAcceptanceToken(): Promise<any> {
  //     return this.payService.getAcceptanceToken();
  //   }
  //   @Post('tokenizeCard')
  //   async tokenizeCard(
  //     @Body()
  //     cardDetails: {
  //       number: string;
  //       cvc: string;
  //       exp_month: string;
  //       exp_year: string;
  //       card_holder: string;
  //     },
  //   ): Promise<any> {
  //     return this.payService.tokenizeCard(cardDetails);
  //   }
  //   @Post('createGatewayTransaction')
  //   async createGatewayTransaction(
  //     @Body()
  //     data: {
  //       reference: string;
  //       installments: number;
  //       acceptance_token: string;
  //       id_tokenizacion: string;
  //     },
  //   ): Promise<any> {
  //     return this.payService.createGatewayTransaction(data);
  //   }
  //   @Post('details')
  //   async getTransactionDetails(
  //     @Body() body: { idTransaction: string },
  //   ): Promise<any> {
  //     return this.payService.getTransactionDetails(body);
  //   }
  //   @Post('updateTransaction')
  //   async updateTransaction(
  //     @Body()
  //     body: {
  //       reference: string;
  //       type: string;
  //       finalized_at: string;
  //       brand: string;
  //       id: string;
  //       status: string;
  //     },
  //   ): Promise<any> {
  //     return await this.payService.updateTransaction(body);
  //   }
}
