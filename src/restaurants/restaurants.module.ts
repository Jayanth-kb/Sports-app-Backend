import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.reslover';

@Module({
    providers:[RestaurantResolver],
})
export class RestaurantsModule {}
