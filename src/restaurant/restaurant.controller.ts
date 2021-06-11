import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { resourceLimits } from "node:worker_threads";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { hasRoles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/auth/entities/roles.enum";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { RestaurantCreationDto } from "./dto/restaurant-creation.dto";
import { RestaurantService } from "./restaurant.service"


@Controller('restaurant')
@hasRoles(UserRole.OWNER,UserRole.ADMIN)
@UseGuards(JwtAuthGuard,RolesGuard)
export class RestaurantController {

    constructor(private restaurantService: RestaurantService) {
    }

    @Get()
    test(){

        return this.restaurantService.findAll();


        // return 'test';
    }

    @Post('add')
    add(@Body(ValidationPipe) restaurantCreationDto: RestaurantCreationDto,@GetUser() owner): Promise<String> {


        return this.restaurantService.addRestaurant(restaurantCreationDto,owner);
        
    }



}