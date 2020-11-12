import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm'

@Entity('component')
export class Component extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  appId: string

  @Column()
  pageId: string

  @Column('text')
  config: string
}
