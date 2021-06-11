import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Owner } from "src/auth/entities/owner.entity";
import { PlateCreationDto } from "./dto/plate-creation.dto";
import { RestaurantCreationDto } from "./dto/restaurant-creation.dto";
import { Plate } from "./entities/plate.entity";
import { Restaurant } from "./entities/restaurant.entity";
import { PlateRepository } from "./repositories/plate.repository";
import { RestaurantRepository } from "./repositories/restaurant.repository";




@Injectable()
export class RestaurantService {

    constructor(
        @InjectRepository(RestaurantRepository) private restaurantRepository: RestaurantRepository,
        @InjectRepository(PlateRepository) private plateRepository: PlateRepository,

    ) {
    }

    async addRestaurant(restaurantCreationDto: RestaurantCreationDto, owner: Owner): Promise<String> {
        return await this.restaurantRepository.add(restaurantCreationDto, owner);



    }

    async findAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.findAll();
    }

    async findOneById(id: number): Promise<Restaurant> {

        return Restaurant.findOne(id)

    }


    async addPlate(plateCreationDto: PlateCreationDto,restaurant :Restaurant): Promise<null> {

        return this.plateRepository.add(plateCreationDto,restaurant);
    }



}