import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsString, Length } from "class-validator";



@ArgsType()
export class createRestaurantDto{
    @Field(type=>String)
    @IsString()
    @Length(5,10)
    name: String;

    @Field(type=>Boolean)
    @IsBoolean()
    isVegan:boolean;

    @Field(type=>String)
    @IsString()
    address: String;

    @Field(type=>String)
    @IsString()
    Owner:String;
}