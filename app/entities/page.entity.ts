import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm'

@Entity('page')
export class Page extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column({
    length: 20,
  })
  page_name: string

  @Column()
  design_width: number

  @Column()
  design_height: number

  @Column({
    length: 100,
  })
  desc: string

  @Column()
  created_time: Date

  @Column('text')
  config: string
}
