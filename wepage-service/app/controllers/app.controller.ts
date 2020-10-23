import { Post, Get, JsonController, Body} from 'routing-controllers'
import redisClient from 'configs/redis'
import uuid from "node-uuid"

@JsonController("/app")
export class AppController {
  constructor() {}

  @Post('/add')
  async add(@Body() app: any): Promise<any> {
    app.id= uuid.v1()
    console.log("app ===", app)
    await redisClient.hmset(`app`, app.id, app)
    return {
        code: 200,
        message: "操作成功"
    }
  }

  @Get("/list")
  async list(): Promise<any> {
    const data = await redisClient.hvals("app")
    return {
        code: 200,
        data,
        message: "操作成功"
    }
  }
}
