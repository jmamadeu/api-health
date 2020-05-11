import { Column, PrimaryColumn, Entity, OneToMany } from 'typeorm';
import SubCategory from './SubCategory';

@Entity()
export default class Category {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  imgUrl: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subCategories: SubCategory[];
}
