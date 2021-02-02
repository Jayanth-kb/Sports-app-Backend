import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { createRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurant.services";



@Resolver(of=>Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantservice:RestaurantService){}
    @Query(returns => [Restaurant])
    Restaurants():Promise<Restaurant[]>{
        return this.restaurantservice.getALL();
    }
    @Mutation(returns => Boolean)
    async createRestaurant(@Args('input')createRestaurantDto:createRestaurantDto,):
    Promise<boolean>{
        try 
        {
            await this.restaurantservice.createRestaurant(createRestaurantDto);
            return true;
        } 
        catch (e) 
        {
            console.log(e);
            return false;
        }
    }

}

