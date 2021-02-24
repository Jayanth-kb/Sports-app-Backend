import { Args, ArgsType, Field, InputType, OmitType } from "@nestjs/graphql";
import { Count } from "../entities/restaurant.entity";



@InputType()
export class createCountDto extends OmitType(Count,["id"],InputType) { }