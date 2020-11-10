import { getRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import { App } from 'app/entities'

@Service()
export class AppService {
  repository: Repository<App>

  constructor() {
    this.repository = getRepository(App)
  }

  async add(app: App): Promise<App> {
    return await this.repository.save(app)
  }

  async list(): Promise<App[]> {
    return await this.repository.find()
  }

  async delete(id: string): Promise<any> {
    const app = new App()
    app.id = id
    return await this.repository.remove(app)
  }
}
