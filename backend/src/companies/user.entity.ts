import column{Column,Entity,OneToMany,PrimaryGeneratedColumn}from 'typeorm';
import {User} from '../users/user.entity';
export enum UserRole{
    SUPER="super admin",
    COMPANYADMIN="company admin",
    EMPLOYEE="employee"
}
@Entity
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    email:string;
    @Column()
    passwordHash:string;
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EMPLOYEE,
    })
    role:UserRole;    
    @ManyToOne(()=>Company,(company)=>company.user, { onDelete: 'CASCADE' })
    company:Company;
}