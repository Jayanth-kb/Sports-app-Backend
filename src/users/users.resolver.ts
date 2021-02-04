import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { createAccountinput, createAccountoutput } from "./dtos/create-account.dto";
import { loginInput, loginOutput } from "./dtos/login.dto";
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
             return this.userService.createAccount(createAccountinput);
            } 
        catch (error) 
           {
             return {error ,ok:false}
           }
    }

    @Mutation(returns=>loginOutput)
    async login(@Args('input')loginInput:loginInput):Promise<loginOutput>
    {
        try 
        {
          return this.userService.login(loginInput);
        } 
        catch (error) 
        {
            return {ok:false,error};
        }
    }
}