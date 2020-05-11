import { Column, PrimaryColumn, Entity, ManyToMany } from 'typeorm';

import Disease from './Disease';

@Entity()
export default class Symptom {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  id: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  imgUrl: string;

  @ManyToMany(() => Disease, (disease) => disease.symptoms)
  diseases: Disease[];
}
