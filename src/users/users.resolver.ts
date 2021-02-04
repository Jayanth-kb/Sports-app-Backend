import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { createAccountinput, createAccountoutput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver{
    constructor (private readonly userService:UsersService){}
    @Query(returns=>Boolean)
    hi(){
        return true;
    }

    @Mutation(returns=>createAccountoutput)
    async createAccount(@Args("input")createAccountinput:createAccountinput):Promise<createAccountoutput>
    {
        try {
              const {ok,error}=await this.userService.createAccount(createAccountinput);
              return{ok,error};
            } 
        catch (error) 
           {
             return {error ,ok:false}
           }
    }
}