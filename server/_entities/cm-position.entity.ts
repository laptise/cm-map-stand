import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CmPositionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Index()
  @Column('date')
  date: Date;
  @Column({ default: 1 })
  count: number;
  @Column('double precision', { nullable: true })
  lat: number;
  @Column('double precision', { nullable: true })
  lng: number;
}
