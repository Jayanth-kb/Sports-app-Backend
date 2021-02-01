import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:process.env.NODE_ENV==='dev' ? '.env.dev':'.env.test',
      ignoreEnvFile:process.env.NODE_ENV=='prod',
    }),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "Jayanth",
      "database": "nuber-eats",
      "synchronize": true,
      "logging": true,
    }),
    GraphQLModule.forRoot({
    autoSchemaFile:true
  }),RestaurantsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
