import { Test, TestingModule } from '@nestjs/testing';
import { PayController } from './pay.controller';
import {
  CreateTransactionHandler,
  GetAcceptanceTokenHandler,
  TokenizeCardHandler,
  CreateWompiTransactionHandler,
  UpdateTransactionHandler,
} from 'src/handler';
import {
  HTTPResponse,
  UpdateTransactionDTO,
  WompiTransactionDTO,
} from 'src/model/dto';
import { CreditCardDTO } from 'src/model/dto/credit-card.dto';
import { AcceptanceToken, Pay } from 'domain/model';

describe('PayController', () => {
  let controller: PayController;
  let createTransactionHandler: CreateTransactionHandler;
  let getAcceptanceTokenHandler: GetAcceptanceTokenHandler;
  let tokenizeCardHandler: TokenizeCardHandler;
  let createWompiTransactionHandler: CreateWompiTransactionHandler;
  let updateTransactionHandler: UpdateTransactionHandler;

  const handlerMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayController],
      providers: [
        {
          provide: CreateTransactionHandler,
          useValue: handlerMock,
        },
        {
          provide: GetAcceptanceTokenHandler,
          useValue: handlerMock,
        },
        {
          provide: TokenizeCardHandler,
          useValue: handlerMock,
        },
        {
          provide: CreateWompiTransactionHandler,
          useValue: handlerMock,
        },
        {
          provide: UpdateTransactionHandler,
          useValue: handlerMock,
        },
      ],
    }).compile();

    controller = module.get<PayController>(PayController);
    createTransactionHandler = module.get<CreateTransactionHandler>(
      CreateTransactionHandler,
    );
    getAcceptanceTokenHandler = module.get<GetAcceptanceTokenHandler>(
      GetAcceptanceTokenHandler,
    );
    tokenizeCardHandler = module.get<TokenizeCardHandler>(TokenizeCardHandler);
    createWompiTransactionHandler = module.get<CreateWompiTransactionHandler>(
      CreateWompiTransactionHandler,
    );
    updateTransactionHandler = module.get<UpdateTransactionHandler>(
      UpdateTransactionHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTransaction', () => {
    it('should call createTransactionHandler.execute with orderId and return result', async () => {
      const orderId = 'order123';
      const response: HTTPResponse<Pay> = {
        code: 'OK',
        data: {} as Pay,
        message: '',
        status: 200,
      };

      jest
        .spyOn(createTransactionHandler, 'execute')
        .mockResolvedValue(response);

      expect(await controller.createTransaction(orderId)).toBe(response);
    });
  });

  describe('getAcceptanceToken', () => {
    it('should call getAcceptanceTokenHandler.execute and return result', async () => {
      const response: HTTPResponse<AcceptanceToken> = {
        code: 'OK',
        data: {} as AcceptanceToken,
        message: '',
        status: 200,
      };

      jest
        .spyOn(getAcceptanceTokenHandler, 'execute')
        .mockResolvedValue(response);

      expect(await controller.getAcceptanceToken()).toBe(response);
    });
  });

  describe('tokenizeCard', () => {
    it('should call tokenizeCardHandler.execute with cardDetails and return result', async () => {
      const cardDetails: CreditCardDTO = {
        number: '4111111111111111',
        cardHolder: 'John Doe',
        month: '12',
        year: '25',
        cvc: '123',
      };
      const response: HTTPResponse<string> = {
        code: 'OK',
        data: '',
        message: '',
        status: 200,
      };

      jest.spyOn(tokenizeCardHandler, 'execute').mockResolvedValue(response);

      expect(await controller.tokenizeCard(cardDetails)).toBe(response);
    });
  });

  describe('createGatewayTransaction', () => {
    it('should call createWompiTransactionHandler.execute with data and return result', async () => {
      const data: WompiTransactionDTO = {
        id_tokenizacion: '',
        acceptance_token: '',
        reference: '',
        installments: 2,
      };
      const response: HTTPResponse<string> = {
        code: 'OK',
        data: '',
        message: '',
        status: 200,
      };

      jest
        .spyOn(createWompiTransactionHandler, 'execute')
        .mockResolvedValue(response);

      expect(await controller.createGatewayTransaction(data)).toBe(response);
    });
  });

  describe('updateTransaction', () => {
    it('should call updateTransactionHandler.execute with body and return result', async () => {
      const body: UpdateTransactionDTO = {
        status: 'PENDING',
        brand: '',
        finalized_at: new Date().toISOString(),
        id: 'dummy',
        reference: '',
        type: '',
      };
      const response: HTTPResponse<Pay> = {
        code: 'OK',
        data: {} as Pay,
        message: '',
        status: 200,
      };

      jest
        .spyOn(updateTransactionHandler, 'execute')
        .mockResolvedValue(response);

      expect(await controller.updateTransaction(body)).toBe(response);
    });
  });
});
