import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'

@Entity('page')
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    length: 20
  })
  name: string

  @Column({
    length: 100
  })
  desc: string

  @Column()
  created_time: string

  @Column("text")
  config: string
}
