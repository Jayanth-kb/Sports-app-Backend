
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken"
import { createAccountinput } from "./dtos/create-account.dto";
import { loginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private readonly users: Repository<User>,
    private readonly config:ConfigService,
    ){}
    

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

    async login({email,password}:loginInput):Promise<{ok:boolean,error?:string,token?:string}>
    {
        try 
        {
            const user=await this.users.findOne({email});
            if(!user)
            {
                return{ok:false,error:"User not found"};
            }
            const passwordCorrect=await user.checkPassword(password);
            if(!passwordCorrect)
            {
                return {ok:false,error:"Wrong Password"}
            }
            return {ok:true,token:"lalala"}
        } 
        catch (error)
        {
            return {ok:false,error}; 
        }
    }
}