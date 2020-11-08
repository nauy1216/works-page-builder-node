import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'

@Entity('appPage')
export class AppPage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  desc: string

  @Column()
  created_time: string
}
