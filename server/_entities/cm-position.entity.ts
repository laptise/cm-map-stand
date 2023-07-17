import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CmPositionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
}
