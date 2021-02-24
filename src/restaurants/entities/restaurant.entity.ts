import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, isString, Length } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Count{

    @Field(type=>Number)
    @PrimaryGeneratedColumn()
    id:number;

    @Field(type=>String)
    @Column()
    @IsString()
    @Length(5,10)
    name:string;

    @Field(type=>Boolean)
    @Column()
    @IsBoolean()
    isVegan:boolean;

    @Field(type=>String)
    @Column()
    @IsString()
    address:string;

    @Field(type=>String)
    @Column()
    @IsString()
    owner:string;
} 