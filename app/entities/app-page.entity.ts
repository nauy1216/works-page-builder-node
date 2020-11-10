import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('app_page')
export class AppPage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  app_id: string

  @Column()
  page_id: string
}
