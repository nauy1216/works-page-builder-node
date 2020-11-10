import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('app_page')
export class AppPage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  appId: string

  @Column()
  pageId: string
}
