import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { resourceLimits } from "node:worker_threads";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { hasRoles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/auth/entities/roles.enum";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { PlateCreationDto } from "./dto/plate-creation.dto";
import { RestaurantCreationDto } from "./dto/restaurant-creation.dto";
import { Plate } from "./entities/plate.entity";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurant.service"


@Controller('restaurant')
@hasRoles(UserRole.OWNER, UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RestaurantController {

    constructor(private restaurantService: RestaurantService) {
    }



    @Post('addRestaurant')
    addRestaurant(@Body(ValidationPipe) restaurantCreationDto: RestaurantCreationDto, @GetUser() owner): Promise<String> {

        return this.restaurantService.addRestaurant(restaurantCreationDto, owner);

    }

    @Post('addPlate')
    async addPlate(@Body(ValidationPipe) plateCreationDto: PlateCreationDto, @GetUser() owner): Promise<null> {

        let restaurant = await this.restaurantService.findRestaurantById(plateCreationDto.restaurantId);

        if (!restaurant || restaurant.owner.id != owner.id)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        else {
            return this.restaurantService.addPlate(plateCreationDto, restaurant);
        }



    }


    @Get('removeRestaurant/:id')
    async removeRestaurant(@Param('id') id, @GetUser() owner): Promise<null> {

        let restaurant = await this.restaurantService.findRestaurantById(id);
        if (!restaurant || restaurant.owner.id != owner.id)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        else {
            this.restaurantService.removeRestaurant(id);
            return;
        }

    }

    @Get('removePlate/:id')
    async removePlate(@Param('id') id, @GetUser() owner): Promise<null> {

        let plate = await this.restaurantService.findPlateById(id);
        if (!plate.restaurant)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);



        let restaurant = await this.restaurantService.findRestaurantById(plate.restaurant.id);


        if (!restaurant || restaurant.owner.id != owner.id)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        else {
            this.restaurantService.removePlate(id);
            return;
        }

    }




    @Get('topRatedPlates/:limit')
    topRatedPlates(@Param('limit') limit): Promise<Plate[]> {

        return this.restaurantService.findTopRatedPlates(limit);

    }


    @Get('topRatedRestaurants/:limit')
    topRatedRestaurants(@Param('limit') limit): Promise<Restaurant[]> {

        return this.restaurantService.findTopRatedRestaurants(limit);

    }




}