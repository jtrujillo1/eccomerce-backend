import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { WompiService } from './wompi.service';
import { InternalAxiosRequestConfig } from 'axios';
import {
  CreateWompiTransaction,
  CreditCard,
  AcceptanceToken,
} from 'domain/model';

describe('WompiService', () => {
  let service: WompiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WompiService,
        {
          provide: HttpService,
          useValue: {
            request: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WompiService>(WompiService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('createWompiTransaction', () => {
    it('should return transaction id on success', async () => {
      const transaction: CreateWompiTransaction = {} as CreateWompiTransaction;

      const mockResponse: any = {
        data: { data: { id: 'transaction-id' } },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      (httpService.request as jest.Mock).mockReturnValue(of(mockResponse));

      const result = await service.createWompiTransaction(transaction);

      expect(result).toBe('transaction-id');
    });

    it('should throw error on failure', async () => {
      const transaction: CreateWompiTransaction = {} as CreateWompiTransaction;

      const errorResponse = {
        response: {
          data: {
            error: {
              messages: ['Some error'],
            },
          },
        },
      };

      (httpService.request as jest.Mock).mockReturnValue(
        throwError(() => errorResponse),
      );

      await expect(service.createWompiTransaction(transaction)).rejects.toThrow(
        'Error in create wompi transactions',
      );
    });
  });

  describe('getAcceptanceToken', () => {
    it('should return acceptance token on success', async () => {
      const mockToken: AcceptanceToken = {} as AcceptanceToken;

      const mockResponse: any = {
        data: { data: { presigned_acceptance: mockToken } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      (httpService.request as jest.Mock).mockReturnValue(of(mockResponse));

      const result = await service.getAcceptanceToken();

      expect(result).toEqual(mockToken);
    });

    it('should throw error on failure', async () => {
      const errorResponse = new Error('Network error');

      (httpService.request as jest.Mock).mockReturnValue(
        throwError(() => errorResponse),
      );

      await expect(service.getAcceptanceToken()).rejects.toThrow(
        'Error in get acceptance token',
      );
    });
  });

  describe('tokenizeCard', () => {
    it('should return token id on success', async () => {
      const creditCard: CreditCard = {
        number: '1234567812345678',
        cvc: '123',
        month: '12',
        year: '25',
        cardHolder: 'John Doe',
      };

      const mockResponse: any = {
        data: { data: { id: 'token-id' } },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      (httpService.request as jest.Mock).mockReturnValue(of(mockResponse));

      const result = await service.tokenizeCard(creditCard);

      expect(result).toBe('token-id');
    });

    it('should throw error on invalid card details', async () => {
      const invalidCard: CreditCard = {
        number: '1234',
        cvc: '12',
        month: '13',
        year: '202',
        cardHolder: '',
      };

      await expect(service.tokenizeCard(invalidCard)).rejects.toThrow();
    });

    it('should throw error on request failure', async () => {
      const creditCard: CreditCard = {
        number: '1234567812345678',
        cvc: '123',
        month: '12',
        year: '25',
        cardHolder: 'John Doe',
      };

      const errorResponse = new Error('Request failed');

      (httpService.request as jest.Mock).mockReturnValue(
        throwError(() => errorResponse),
      );

      await expect(service.tokenizeCard(creditCard)).rejects.toThrow(
        'Error in tokenizar credit card',
      );
    });
  });
});
