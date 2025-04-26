import {
  AcceptanceToken,
  CreateWompiTransaction,
  CreditCard,
} from 'domain/model';

export interface IWompiService {
  getAcceptanceToken(): Promise<AcceptanceToken>;
  tokenizeCard(creditCard: CreditCard): Promise<string>;
  createWompiTransaction(
    createWompiTransaction: CreateWompiTransaction,
  ): Promise<string>;
}
