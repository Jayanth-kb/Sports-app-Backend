import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { createCountDto } from "./dtos/create-restaurant.dto";
import { Count } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurant.services";



@Resolver(of=>Count)
export class RestaurantResolver {
    constructor(private readonly restaurantservice:RestaurantService){}
    @Query(returns => [Count])
    Counts():Promise<Count[]>{
        return this.restaurantservice.getALL();
    }
    @Mutation(returns => Boolean)
    async createCount(@Args('input')createCountDto:createCountDto,):
    Promise<boolean>{
        try 
        {
            await this.restaurantservice.createCounts(createCountDto);
            return true;
        } 
        catch (e) 
        {
            console.log(e);
            return false;
        }
    }

}

