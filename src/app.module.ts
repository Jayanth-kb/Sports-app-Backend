import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as joi from 'joi'
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { Count } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema:joi.object({
        NODE_ENV:joi.string().valid('dev','prod').required(),
        DB_HOST:joi.string().required(),
        DB_PORT:joi.string().required(),
        DB_USERNAME:joi.string().required(),
        DB_PASSWORD:joi.string().required(),
        DB_NAME:joi.string().required(),
        PRIVATE_KEY:joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities:[User,Count],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),UsersModule, RestaurantsModule, JwtModule.forRoot({privateKey:process.env.PRIVATE_KEY},)],
  controllers: [],
  providers: [],
})
export class AppModule { }
