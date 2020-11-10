import { Post, Get, JsonController, Body, QueryParam } from 'routing-controllers'
import redisClient from 'configs/redis'
import { uuid } from 'app/helpers'
import { AppService } from 'app/services'
import { App } from 'app/entities'
import { Inject } from 'typedi'

@JsonController('/app')
export class AppController {
  @Inject()
  appService: AppService

  @Post('/addOrUpdate')
  async add(@Body() app: App): Promise<any> {
    if (!app.id) {
      app.id = uuid()
      app.createTime = new Date()
    }
    this.appService.add(app)
    return {
      code: 200,
      message: '操作成功',
    }
  }

  @Get('/list')
  async list(): Promise<any> {
    const data = await this.appService.list()
    return {
      code: 200,
      data,
      message: '操作成功',
    }
  }

  @Get('/delete')
  async delete(@QueryParam('id') id: string): Promise<any> {
    await this.appService.delete(id)
    return {
      code: 200,
      message: '操作成功',
    }
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
