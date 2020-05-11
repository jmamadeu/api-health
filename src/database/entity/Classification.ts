import { Column, PrimaryColumn, Entity, OneToMany } from 'typeorm';
import Disease from './Disease';

@Entity()
export default class Classification {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  imgUrl: string;

  @OneToMany(() => Disease, (disease) => disease.classification)
  diseases: Disease[];
}
