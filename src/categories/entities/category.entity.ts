// import { Product } from '../../products/entities/product.entity'
// import { BaseEntity, Column, Entity, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

// @Entity()
// export class Category extends BaseEntity {


//     @ObjectIdColumn()
//     _id: string;

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({type: 'varchar', length: 60})
//     name: string

//     @OneToMany(() => Product, (product) => product.category, {cascade: true}  )
//     products: Product[]
// }


import { Product } from '../../products/entities/product.entity'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 60})
    name: string

    @OneToMany(() => Product, (product) => product.category, {cascade: true}  )
    products: Product[]
}
