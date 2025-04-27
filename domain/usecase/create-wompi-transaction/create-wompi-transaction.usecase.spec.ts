import { CreateWompiTransactionUseCase } from './create-wompi-transaction.usecase';
import { IWompiService, IPayRepository, ILogger } from 'domain/interface';
import { WompiTransaction, Pay, Order, User } from 'domain/model';

describe('CreateWompiTransactionUseCase', () => {
  let useCase: CreateWompiTransactionUseCase;
  let wompiService: jest.Mocked<IWompiService>;
  let payRepository: jest.Mocked<IPayRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    wompiService = {
      createWompiTransaction: jest.fn(),
    } as unknown as jest.Mocked<IWompiService>;

    payRepository = {
      getTransactionByReference: jest.fn(),
    } as unknown as jest.Mocked<IPayRepository>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new CreateWompiTransactionUseCase(
      wompiService,
      payRepository,
      logger,
    );

    process.env.WOMPI_INTEGRITY_KEY = 'test_integrity_key';
  });

  it('should create wompi transaction successfully', async () => {
    const wompiTransaction: WompiTransaction = {
      reference: 'ref-123',
      acceptance_token: 'token-abc',
      id_tokenizacion: 'id-token-xyz',
      installments: 1,
    } as WompiTransaction;

    const user: User = {
      email: 'user@example.com',
    } as User;

    const order: Order = {
      amountInCents: 10000,
      user,
    } as Order;

    const payTransaction: Pay = {
      order,
    } as Pay;

    payRepository.getTransactionByReference.mockResolvedValue(payTransaction);
    wompiService.createWompiTransaction.mockResolvedValue(
      'wompi-transaction-1',
    );

    const result = await useCase.apply(wompiTransaction);

    expect(payRepository.getTransactionByReference).toHaveBeenCalledWith(
      wompiTransaction.reference,
    );
    expect(wompiService.createWompiTransaction).toHaveBeenCalled();

    expect(result).toEqual('wompi-transaction-1');
  });
});
