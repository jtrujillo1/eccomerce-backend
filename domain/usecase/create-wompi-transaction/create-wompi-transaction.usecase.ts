import { CreateWompiTransaction, WompiTransaction } from 'domain/model';
import { ILogger, IPayRepository, IWompiService } from 'domain/interface';
import { createHash } from 'crypto';

export class CreateWompiTransactionUseCase {
  constructor(
    private readonly wompiService: IWompiService,
    private readonly payRepository: IPayRepository,
    private readonly logger: ILogger,
  ) {}

  async apply(wompiTransaction: WompiTransaction) {
    const transaction = await this.payRepository.getTransactionByReference(
      wompiTransaction.reference,
    );

    const order = transaction.order;

    const totalInCents = order.amountInCents * 100;

    const cleanAmount = Math.round(totalInCents);

    const currency = 'COP';

    const signature = this.getSignature(
      wompiTransaction.reference,
      cleanAmount,
      currency,
    );

    const createTransaction: CreateWompiTransaction = {
      currency,
      amount_in_cents: cleanAmount,
      acceptance_token: wompiTransaction.acceptance_token,
      customer_email: order.user.email,
      reference: wompiTransaction.reference,
      signature,
      payment_method: {
        token: wompiTransaction.id_tokenizacion,
        installments: wompiTransaction.installments,
        type: 'CARD',
        sandbox_status: 'APPROVED',
      },
    };

    const data =
      await this.wompiService.createWompiTransaction(createTransaction);

    return data;
  }

  private getSignature(
    reference: string,
    amountInCents: number,
    currency: string,
  ) {
    const integrityKey = process.env.WOMPI_INTEGRITY_KEY!;
    const concatStrig = `${reference}${amountInCents}${currency}${integrityKey}`;

    const hash = createHash('sha256');

    hash.update(concatStrig, 'utf8');

    return hash.digest('hex');
  }
}
