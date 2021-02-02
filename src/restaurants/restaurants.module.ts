import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.services';
import { RestaurantResolver } from './restaurants.reslover';

@Module({
    imports:[TypeOrmModule.forFeature([Restaurant])],
    providers:[RestaurantResolver,RestaurantService],
})
export class RestaurantsModule {}
