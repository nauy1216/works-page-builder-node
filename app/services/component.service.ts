import { getRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import { Component } from 'app/entities'

@Service()
export class ComponentService {
  repository: Repository<Component>

  constructor() {
    this.repository = getRepository(Component)
  }

  async add(app: Component): Promise<Component> {
    return await this.repository.save(app)
  }

  async list(): Promise<Component[]> {
    return await this.repository.find()
  }

  async delete(id: string): Promise<any> {
    const app = new Component()
    app.id = id
    return await this.repository.remove(app)
  }
}
