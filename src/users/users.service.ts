
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createAccountinput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private readonly users: Repository<User>){}

    async createAccount({email,password,role}:createAccountinput):Promise<{ok:boolean,error?:string}>
    {
        try {
             const exists=await this.users.findOne({email});
             if(exists)
                {
                    return {ok:false,error:"Email id Exists"}; 
                }
             await this.users.save(this.users.create({email,password,role}))
             return {ok:true};
            } 
        catch (e)
            { 
              return {ok:false,error:"Couldn't create Account"};
            }
    }
}