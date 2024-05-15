import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


interface role{
    Name: string,
    Email: string,
    contactNumber:string,
    Address:string,
    Salary:number
}

@Entity()
export class Employees implements role{

    @PrimaryGeneratedColumn()
    employeeId:number

    @Column()
    Name: string

    @Column()
    Email: string

    @Column()
    contactNumber:string

    @Column()
    Address: string;

    @Column()
    Salary: number;
}
