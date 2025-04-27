import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { AcceptanceToken, Pay, WompiTransaction } from 'domain/model';
import {
  CreateTransactionHandler,
  CreateWompiTransactionHandler,
  GetAcceptanceTokenHandler,
  TokenizeCardHandler,
  UpdateTransactionHandler,
} from 'src/handler';
import {
  HTTPResponse,
  UpdateTransactionDTO,
  WompiTransactionDTO,
} from 'src/model/dto';
import { CreditCardDTO } from 'src/model/dto/credit-card.dto';

@Controller('pay')
export class PayController {
  constructor(
    private readonly createTransactionHandler: CreateTransactionHandler,
    private readonly getAcceptatanceTokenHandler: GetAcceptanceTokenHandler,
    private readonly tokenizeCardHandler: TokenizeCardHandler,
    private readonly createWompiTransactionHandler: CreateWompiTransactionHandler,
    private readonly updateTransactionHandler: UpdateTransactionHandler,
  ) {}
  @Post('createTransaction/:orderId')
  async createTransaction(
    @Param('orderId') orderId: string,
  ): Promise<HTTPResponse<Pay>> {
    return this.createTransactionHandler.execute(orderId);
  }

  @Get('getAcceptanceToken')
  async getAcceptanceToken(): Promise<HTTPResponse<AcceptanceToken>> {
    return this.getAcceptatanceTokenHandler.execute();
  }

  @Post('tokenizeCard')
  async tokenizeCard(
    @Body() cardDetails: CreditCardDTO,
  ): Promise<HTTPResponse> {
    return this.tokenizeCardHandler.execute(cardDetails);
  }

  @Post('createGatewayTransaction')
  async createGatewayTransaction(
    @Body() data: WompiTransactionDTO,
  ): Promise<HTTPResponse> {
    return this.createWompiTransactionHandler.execute(data);
  }

  //   @Post('details')
  //   async getTransactionDetails(
  //     @Body() body: { idTransaction: string },
  //   ): Promise<any> {
  //     return this.payService.getTransactionDetails(body);
  //   }

  @Post('updateTransaction')
  async updateTransaction(
    @Body() body: UpdateTransactionDTO,
  ): Promise<HTTPResponse> {
    return this.updateTransactionHandler.execute(body);
  }
}
