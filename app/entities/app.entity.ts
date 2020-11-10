import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm'

@Entity('app')
export class App extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  app_name: string

  @Column()
  app_type: string

  @Column()
  design_width: number

  @Column()
  design_height: number

  @Column({
    type: 'varchar', // 表字段数据类型
    name: 'desc', // 字段名
    length: 100,
    nullable: true, // 可以为null
    default: '这是一段描述', // 默认值
    primary: false, // 是否为主键
    comment: '应用描述',
  })
  desc: string

  @Column()
  create_time: Date
}
