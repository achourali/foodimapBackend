import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
