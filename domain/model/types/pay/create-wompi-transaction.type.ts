export type WompiTransaction = {
  reference: string;
  installments: number;
  acceptance_token: string;
  id_tokenizacion: string;
};

export type CreateWompiTransaction = {
  amount_in_cents: number;
  currency: string;
  signature: string;
  reference: string;
  customer_email: string;
  acceptance_token: string;
  payment_method: {
    type: string;
    sandbox_status: string;
    token: string;
    installments: number;
  };
};
