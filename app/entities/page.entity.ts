import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm'

@Entity('page')
export class Page extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column({
    length: 20,
  })
  pageName: string

  @Column()
  designWidth: number

  @Column()
  designHeight: number

  @Column({
    length: 100,
  })
  desc: string

  @Column()
  createdTime: Date

  @Column('text')
  config: string
}
