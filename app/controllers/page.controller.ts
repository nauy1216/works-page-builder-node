import { Post, Get, JsonController, Body, QueryParam } from 'routing-controllers'
import { uuid } from 'app/helpers'
import { Page } from 'app/entities'
import { PageService } from 'app/services'
import { Inject } from 'typedi'
import Exception from 'app/response/exception'

@JsonController('/page')
export class PageController {
  @Inject()
  pageService: PageService

  @Post('/addOrUpdate')
  async add(@Body() data: Page): Promise<any> {
    if (!data.id) {
      data.id = uuid()
      data.createdTime = new Date()
    }
    const pageData = this.pageService.add(data)

    return {
      code: 200,
      data: pageData,
      message: '操作成功',
    }
  }

  @Get('/list')
  async list(@QueryParam('appId') appId: string): Promise<any> {
    const data = await this.pageService.list(appId)
    return {
      code: 200,
      data,
      message: '操作成功',
    }
  }

  @Get('/getOne')
  async getOne(@QueryParam('pageId') pageId: string): Promise<any> {
    const data = await this.pageService.getOne(pageId)
    return {
      code: 200,
      data,
      message: '操作成功',
    }
  }

  @Get('/delete')
  async delete(@QueryParam('id') id: string): Promise<any> {
    if (!id) {
      throw new Exception(400, 'id不能为空')
    }
    await this.pageService.delete(id)
    return {
      code: 200,
      message: '操作成功',
    }
  }
}
