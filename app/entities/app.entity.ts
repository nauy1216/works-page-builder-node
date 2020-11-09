import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('app')
export class App extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  app_name: string

  @Column()
  app_type: string
}
