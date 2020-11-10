import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm'

@Entity('app')
export class App extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  app_name: string

  @Column()
  app_type: string
}
