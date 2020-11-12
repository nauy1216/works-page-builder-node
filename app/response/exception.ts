import { HttpError } from 'routing-controllers'
export default class Exception extends HttpError {
  public operationName: string
  public args: any[]
  public code: number

  constructor(code: number, message: string, args: any[] = []) {
    super(200)
    this.code = code
    this.message = message
    this.args = args // 可用于内部log记录
  }

  toJson() {
    return {
      code: this.code,
      status: this.httpCode,
      message: this.message,
    }
  }
}
