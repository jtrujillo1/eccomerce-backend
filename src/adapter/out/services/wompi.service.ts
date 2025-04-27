import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IWompiService } from 'domain/interface';
import {
  AcceptanceToken,
  CreateWompiTransaction,
  CreditCard,
} from 'domain/model';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WompiService implements IWompiService {
  constructor(private readonly httpService: HttpService) {}

  async createWompiTransaction(
    createWompiTransaction: CreateWompiTransaction,
  ): Promise<string> {
    try {
      const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `/transactions`,
        data: createWompiTransaction,
        headers: {
          Authorization: `Bearer ${process.env.WOMPI_PUBLIC_KEY!}`,
          'Content-Type': 'application/json',
        },
      };

      const {
        data: { data },
      } = await firstValueFrom(
        this.httpService.request<AxiosResponse<{ id: string }>>(requestConfig),
      );

      return data.id;
    } catch (error) {
      throw new Error('Error in create wompi transactions ', error as Error);
    }
  }

  async getAcceptanceToken(): Promise<AcceptanceToken> {
    try {
      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `/merchants/${process.env.WOMPI_PUBLIC_KEY!}`,
      };

      const {
        data: { data },
      } = await firstValueFrom(
        this.httpService.request<
          AxiosResponse<{ presigned_acceptance: AcceptanceToken }>
        >(requestConfig),
      );

      return data.presigned_acceptance;
    } catch (error) {
      throw new Error('Error in get acceptance token', error as Error);
    }
  }

  async tokenizeCard(creditCard: CreditCard): Promise<string> {
    const { number, cvc, month, year, cardHolder } = creditCard;

    this.validateCardDetails(number, cvc, month, year, cardHolder);

    const body = {
      number,
      cvc,
      exp_month: month,
      exp_year: year,
      card_holder: cardHolder,
    };
    try {
      const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: '/tokens/cards',
        data: body,
        headers: {
          Authorization: `Bearer ${process.env.WOMPI_PUBLIC_KEY!}`,
          'Content-Type': 'application/json',
        },
      };

      const {
        data: { data },
      } = await firstValueFrom(
        this.httpService.request<AxiosResponse<{ id: string }>>(requestConfig),
      );

      return data.id;
    } catch (error: any) {
      throw new Error('Error in tokenizar credit card', error as Error);
    }
  }

  private validateCardDetails(
    number: string,
    cvc: string,
    month: string,
    year: string,
    cardHolder: string,
  ) {
    const cardNumberPattern = /^\d{16}$/;
    const cvcPattern = /^\d{3,4}$/;
    const expMonthPattern = /^(0[1-9]|1[0-2])$/;
    const expYearPattern = /^\d{2}$|^\d{4}$/;

    if (!cardNumberPattern.test(number)) {
      throw new Error('Invalid card number');
    }
    if (!cvcPattern.test(cvc)) {
      throw new Error('Invalid cvc number');
    }
    if (!expMonthPattern.test(month)) {
      throw new Error('Invalid expired month');
    }
    if (!expYearPattern.test(year)) {
      throw new Error('Invalid expired year');
    }
    if (!cardHolder) {
      throw new Error('Invalid card holder');
    }
    return null;
  }
}
