import column{Column,Entity,OneToMany,PrimaryGeneratedColumn}from 'typeorm';
import {User} from '../users/user.entity';
@Entity
export class Company{
    @PrimaryGeneratedColumn()
    id:number;
    @column
    name:string;
    @Column()
    name:string;
    @Column({unique:true})
    taxNumber:string;
    @Column()
    address?:string;
    @OneToMany(()=>User,(user)=>user.company)
    users:User[];

}
