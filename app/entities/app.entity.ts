import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm'
import { MaxLength, IsNotEmpty } from 'class-validator'

@Entity('app')
export class App extends BaseEntity {
  @PrimaryColumn()
  id: string

  @IsNotEmpty({ message: 'app_name为必填' })
  @Column()
  app_name: string

  @IsNotEmpty({ message: 'app_type为必填' })
  @Column()
  app_type: string

  @IsNotEmpty({ message: 'design_width为必填' })
  @Column()
  design_width: number

  @IsNotEmpty({ message: 'design_height为必填' })
  @Column()
  design_height: number

  @MaxLength(100, { message: 'desc长度不能超过100' })
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
