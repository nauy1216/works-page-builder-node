import { Post, Get, JsonController, Body, QueryParam} from 'routing-controllers'
import redisClient from 'configs/redis'
import uuid from "node-uuid"

@JsonController("/page")
export class PageController {
  constructor() {}

  @Post('/add')
  async add(@Body() data: any): Promise<any> {
    data.id = uuid.v1()
    redisClient.hmset(`page:${data.appId}`, data.id, data)
    return {
        code: 200,
        message: "操作成功"
    }
  }

  @Get("/list")
  async list(@QueryParam("appId") appId: string): Promise<any> {
    const data = await redisClient.hvals(`page:${appId}`) as any
    data.forEach(item => {
        delete item.config
    })
    return {
        code: 200,
        data,
        message: "操作成功"
    }
  }

  @Get("/getConfig")
  async getConfig(@QueryParam("appId") appId: string, @QueryParam("pageId") pageId: string): Promise<any> {
    const data = await redisClient.hmget(`page:${appId}`, pageId) as any
    return {
        code: 200,
        data: data? data[0].config: null,
        message: "操作成功"
    }
  }

  @Post('/edit')
  async edit(@Body() body: any): Promise<any> {
    const data = await redisClient.hmget(`page:${body.appId}`, body.pageId) as any
    data[0].config = body.config
    redisClient.hmset(`page:${body.appId}`, body.pageId, data[0])
    return {
        code: 200,
        message: "操作成功"
    }
  }
}
