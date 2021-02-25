import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { Context, GraphQLModule } from '@nestjs/graphql';
import * as joi from 'joi'
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { Count } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';

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
      autoSchemaFile: true,
      context:({req})=>({user:req['user']})
    }),UsersModule, RestaurantsModule, JwtModule.forRoot({privateKey:process.env.PRIVATE_KEY},), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer)
  {
    consumer.apply(JwtMiddleware).forRoutes({
      path:'/graphql',
      method:RequestMethod.ALL,
    });
  }
 }
