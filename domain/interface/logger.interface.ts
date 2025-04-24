export interface ILogger {
  debug(message: string | object, context?: string): void;
  warn(message: string | object, context?: string): void;
  error(message: string | object, trace?: string, context?: string): void;
  log(message: string | object, context?: string): void;
}
