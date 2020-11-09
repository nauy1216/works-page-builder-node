import { Get, JsonController, QueryParam } from 'routing-controllers'
@JsonController()
export class SessionsController {
  @Get('/sessions')
  async session(@QueryParam('username') username: string): Promise<any> {
    return username
  }
}
