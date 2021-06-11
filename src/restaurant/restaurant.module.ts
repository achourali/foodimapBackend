import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ClientRepository } from 'src/auth/repositories/client.repository';
import { OwnerRepository } from 'src/auth/repositories/owner.repository';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RestaurantRepository,ClientRepository,OwnerRepository])
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService, RolesGuard, JwtAuthGuard],
})
export class RestaurantModule { }


