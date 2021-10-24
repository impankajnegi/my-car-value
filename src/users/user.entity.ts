import {Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove} from 'typeorm'
 
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    email:string;
    @Column() 
    password:string;

    @AfterInsert()
    afterinsert(){
        console.log(`User inserted with id ${this.id}`)
    }

    @AfterRemove()
    afterremove(){
        console.log(`user removes with id ${this.id}`)
    }
}