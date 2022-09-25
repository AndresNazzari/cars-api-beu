import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Color } from './Color.entity';
import { Brand } from './Brand.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: string;

  @ManyToMany(() => Color, (color) => color.vehicles, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  colors: Color[];

  @ManyToMany(() => Brand, (brand) => brand.vehicles, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  brands: Brand[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
