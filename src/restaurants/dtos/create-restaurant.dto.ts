import { Args, ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsString, Length } from "class-validator";



@ArgsType()
export class createRestaurantDto{
    @Field(type=>String)
    @IsString()
    @Length(5,10)
    name:string;

    @Field(type=>Boolean)
    @IsBoolean()
    isVegan:boolean;

    @Field(type=>String)
    @IsString()
    address:string;

    @Field(type=>String)
    @IsString()
    owner:string;

}