import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../companies/company.entity';

export enum Role {
  SuperAdmin = 'super_admin',
  CompanyAdmin = 'company_admin',
  Employee = 'employee',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: Role, default: Role.Employee })
  role: Role;

  @ManyToOne(() => Company, (company) => company.users, { onDelete: 'CASCADE' })
  company: Company;
}