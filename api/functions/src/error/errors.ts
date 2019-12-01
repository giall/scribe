export class AppError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class Errors {
  static unauthorized(message: string) {
    return new AppError(message, 401);
  }

  static notFound(message: string) {
    return new AppError(message, 404);
  }
}
