import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Mutationoutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class loginInput extends PickType(User,['email','password']){}

@ObjectType()
export class loginOutput extends Mutationoutput
{
    @Field(type=>String,{nullable:true})
    token?:String;
}
