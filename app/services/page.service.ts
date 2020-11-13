import { getRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import { Page } from 'app/entities'

@Service()
export class PageService {
  repository: Repository<Page>

  constructor() {
    this.repository = getRepository(Page)
  }

  async add(page: Page): Promise<Page> {
    return await this.repository.save(page)
  }

  async list(appId: string): Promise<Page[]> {
    return await this.repository
      .createQueryBuilder('page')
      .where('page.appId = :id', { id: appId })
      .orderBy('page.createdTime')
      .getMany()
  }

  async getOne(pageId: string): Promise<Page> {
    return await this.repository
      .createQueryBuilder('page')
      .where('page.id = :id', { id: pageId })
      .getOne()
  }

  async delete(id: string): Promise<any> {
    const page = new Page()
    page.id = id
    return await this.repository.remove(page)
  }
}
