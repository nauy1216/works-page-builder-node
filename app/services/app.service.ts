import { getMongoRepository, MongoRepository } from 'typeorm'
import { Service } from 'typedi'
import { App } from 'app/entities'

@Service()
export class AppService {
  repository: MongoRepository<App>

  constructor() {
    this.repository = getMongoRepository(App)
  }

  async create(session: App): Promise<App> {
    return await this.repository.save(session)
  }
}
