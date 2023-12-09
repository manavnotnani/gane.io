export interface PromiseResolve {
  status: number,
  error: boolean,
  message: string,
  data?: any,
}

export interface JoiValidationResult {
  error: boolean;
  value: any;
  message?: string;
}
