export class InternalServerError extends Error {
  public status: number;

  constructor(status: number, message: string, options?: { cause?: Error }) {
    super(`${message} (${status})`, options);
    this.status = status;
  }
}
