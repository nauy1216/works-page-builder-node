import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm'
import { MaxLength, IsNotEmpty } from 'class-validator'

@Entity('app')
export class App extends BaseEntity {
  @PrimaryColumn()
  id: string

  @IsNotEmpty({ message: 'app_name为必填' })
  @Column()
  appName: string // 应用名称

  @IsNotEmpty({ message: 'app_type为必填' })
  @Column()
  appType: string // 应用类型

  @IsNotEmpty({ message: 'design_width为必填' })
  @Column()
  designWidth: number // 设计宽度

  @IsNotEmpty({ message: 'design_height为必填' })
  @Column()
  designHeight: number // 设计高度

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
  desc: string // 应用描述

  @Column()
  createTime: Date // 创建时间

  @Column('text')
  config: string // 创建时间
}
