import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Restaurant {

    @Field(type=>Number)
    @PrimaryGeneratedColumn()
    id:number;

    @Field(type=>String)
    @Column()
    name:string;

    @Field(type=>String)
    @Column()
    isVegan:string;

    @Field(type=>String)
    @Column()
    address:string;

    @Field(type=>String)
    @Column()
    owner:string;

} 