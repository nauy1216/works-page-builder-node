import { Post, Get, JsonController, Body, QueryParam } from 'routing-controllers'
import redisClient from 'configs/redis'
import { uuid } from 'app/helpers'
import { Page } from 'app/entities'
import { PageService } from 'app/services'
import { Inject } from 'typedi'

@JsonController('/page')
export class PageController {
  @Inject()
  pageService: PageService

  @Post('/addOrUpdate')
  async add(@Body() data: Page): Promise<any> {
    // data.id = uuid()
    // redisClient.hmset(`page:${data.appId}`, data.id, data)
    if (!data.id) {
      data.id = uuid()
    }
    this.pageService.add(data)
    return {
      code: 200,
      message: '操作成功',
    }
  }

  @Get('/list')
  async list(@QueryParam('appId') appId: string): Promise<any> {
    // const data = (await redisClient.hvals(`page:${appId}`)) as any
    // data.forEach(item => {
    //   delete item.config
    // })
    const data = await this.pageService.list(appId)
    return {
      code: 200,
      data,
      message: '操作成功',
    }
  }

  @Get('/getConfig')
  async getConfig(
    @QueryParam('appId') appId: string,
    @QueryParam('pageId') pageId: string,
  ): Promise<any> {
    const data = (await redisClient.hmget(`page:${appId}`, pageId)) as any
    return {
      code: 200,
      data: data ? data[0].config : null,
      message: '操作成功',
    }
  }

  @Post('/edit')
  async edit(@Body() body: any): Promise<any> {
    const data = (await redisClient.hmget(`page:${body.appId}`, body.pageId)) as any
    data[0].config = body.config
    redisClient.hmset(`page:${body.appId}`, body.pageId, data[0])
    return {
      code: 200,
      message: '操作成功',
    }
  }
}
