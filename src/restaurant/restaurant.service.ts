import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Owner } from "src/auth/entities/owner.entity";
import { RestaurantCreationDto } from "./dto/restaurant-creation.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantRepository } from "./repositories/restaurant.repository";




@Injectable()
export class RestaurantService {

    constructor(
        @InjectRepository(RestaurantRepository) private restaurantRepository: RestaurantRepository,
    ) {
    }

    async addRestaurant(restaurantCreationDto: RestaurantCreationDto,owner:Owner): Promise<String> {
        return await this.restaurantRepository.add(restaurantCreationDto,owner);

        

    }

    async findAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.findAll();
    }


}