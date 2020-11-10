import { Post, Get, JsonController, Body, QueryParam } from 'routing-controllers'
import redisClient from 'configs/redis'
import uuid from 'node-uuid'
import { AppService } from 'app/services'
import { Inject } from 'typedi'

@JsonController('/app')
export class AppController {
  @Inject()
  appService: AppService

  @Post('/add')
  async add(@Body() app: any): Promise<any> {
    app.id = uuid.v1()
    await redisClient.hmset(`app`, app.id, app)
    return {
      code: 200,
      message: '操作成功',
    }
  }

  @Get('/list')
  async list(): Promise<any> {
    const data = await redisClient.hvals('app')
    return {
      code: 200,
      data,
      message: '操作成功',
    }
  }

  @Get('/list1')
  async list1(): Promise<any> {
    const res = await this.appService.getList()
    return res
  }

  @Get('/getAppConfig')
  async getAppConfig(@QueryParam('appId') appId: string): Promise<any> {
    const app = (await redisClient.hmget('app', appId)) as any
    const data = (await redisClient.hvals(`page:${appId}`)) as any
    return {
      code: 200,
      data: {
        id: app[0].id,
        appName: app[0].appName,
        appType: app[0].appType,
        pages: data,
      },
      message: '操作成功',
    }
  }
}
