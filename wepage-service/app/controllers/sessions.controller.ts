import { Get, JsonController, QueryParam } from 'routing-controllers'
import redisClient from 'configs/redis'

@JsonController()
export class SessionsController {
  constructor() {}

  @Get('/sessions')
  async session(@QueryParam('username') username: string): Promise<any> {
    const res = await redisClient.get("app:test")
    return res
  }
}
