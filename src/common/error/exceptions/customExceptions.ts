class ClientException extends Error {
  statusCode: number;
  constructor(msg: string | undefined = undefined, statusCode: number = 400) {
    super(msg);
    this.statusCode = statusCode;
  }
}
class CustomException extends Error {
  statusCode: number;
  constructor(msg: string | undefined = undefined, statusCode: number = 500) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export { ClientException, CustomException };