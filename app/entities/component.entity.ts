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

  @Column()
  type: string // 组件使用类型 app | page  app: 应用使用  page: 页面使用
}
