import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import Category from './Category';

import Disease from './Disease';

@Entity()
export default class SubCategory {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @OneToMany(() => Disease, (disease) => disease.subCategory)
  diseases: Disease[];
}
