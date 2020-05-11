import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import SubCategory from './SubCategory';
import Symptom from './Symptom';
import Classification from './Classification';

@Entity()
export default class Disease {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  treatment: string;

  @Column('varchar')
  imgUrl: string;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.diseases)
  subCategory: SubCategory;

  @ManyToOne(() => Classification, (classification) => classification.diseases)
  classification: Classification;

  @ManyToMany(() => Symptom, (symptom) => symptom.diseases)
  @JoinTable()
  symptoms: Symptom[];
}
