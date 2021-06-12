import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Owner } from "src/auth/entities/owner.entity";
import { Repository } from "typeorm";
import { PlateCreationDto } from "./dto/plate-creation.dto";
import { RestaurantCreationDto } from "./dto/restaurant-creation.dto";
import { Plate } from "./entities/plate.entity";
import { Restaurant } from "./entities/restaurant.entity";
import { PlateRepository } from "./repositories/plate.repository";
import { RestaurantRepository } from "./repositories/restaurant.repository";




@Injectable()
export class RestaurantService {

    constructor(
        @InjectRepository(RestaurantRepository) private customRestaurantRepository: RestaurantRepository,
        @InjectRepository(PlateRepository) private customPlateRepository: PlateRepository,
        @InjectRepository(Plate) private plateRepository: Repository<Plate>,
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,

    ) {
    }

    async addRestaurant(restaurantCreationDto: RestaurantCreationDto, owner: Owner): Promise<String> {
        return await this.customRestaurantRepository.add(restaurantCreationDto, owner);



    }

    async findAll(): Promise<Restaurant[]> {
        return this.customRestaurantRepository.findAll();
    }

    async findRestaurantById(id: number): Promise<Restaurant> {

        return Restaurant.findOne(id)

    }


    async findPlateById(id: number): Promise<Plate> {

        return Plate.findOne(id)

    }


    async addPlate(plateCreationDto: PlateCreationDto, restaurant: Restaurant): Promise<null> {

        return this.customPlateRepository.add(plateCreationDto, restaurant);
    }


    async findTopRatedPlates(limit :number): Promise<Plate[]> {

        return this.plateRepository.find({
            order:{
                rate:"DESC"
            },
            take:limit
        })



    }


    async findTopRatedRestaurants(limit :number): Promise<Restaurant[]> {

        return this.restaurantRepository.find({
            order:{
                rate:"DESC"
            },
            take:limit
        })



    }

    async removeRestaurant(id :number){
        this.restaurantRepository.delete(id);
    }


    async removePlate(id :number){
        this.plateRepository.delete(id);
    }



}