import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { type } from "os";
import { User } from "../entities/user.entity";

@InputType()
export class createAccountinput extends PickType
(User,["email","password","role"]){}

@ObjectType()
export class createAccountoutput
{
    @Field(type=>String,{nullable:true})
    error?:string;

    @Field(type=>Boolean)
    ok:boolean;
}
