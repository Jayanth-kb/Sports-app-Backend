import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Count } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.services';
import { RestaurantResolver } from './restaurants.reslover';

@Module({
    imports:[TypeOrmModule.forFeature([Count])],
    providers:[RestaurantResolver,RestaurantService],
})
export class RestaurantsModule {}
