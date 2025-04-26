export class HTTPResponse<T = unknown> {
  public code: string;
  public message: string;
  public data?: T;

  constructor(
    public status: number,
    code: string,
    message: string,
    data?: T,
  ) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
