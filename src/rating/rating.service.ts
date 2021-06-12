import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isInstance } from "class-validator";
import { Client } from "src/auth/entities/client.entity";
import { Plate } from "src/restaurant/entities/plate.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { Repository } from "typeorm";
import { RatingDto } from "./dto/rating.dto";
import { PlateRate } from "./entities/plateRate.entity";
import { RestaurantRate } from "./entities/restaurantRate.entity";


@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(PlateRate)
        private plateRatingRepository: Repository<PlateRate>,
        @InjectRepository(RestaurantRate)
        private restaurantRatingRepository: Repository<RestaurantRate>,
        @InjectRepository(Plate)
        private plateRepository: Repository<Plate>,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,

    ) { }

    async addPlateRate(rateDto: RatingDto, client: Client) {


        let plate = await this.plateRepository.findOne(rateDto.entityId);

        if (!plate)
            throw new InternalServerErrorException();
        else {

            let oldRate = await this.plateRatingRepository.findOne({ where: { "plate": plate, "client": client } });
            let totalRating = await (await this.plateRatingRepository.find({ where: { "plate": plate } })).length;

            let newRateValue: number;

            if (oldRate) {

                newRateValue = Math.ceil((plate.rate * totalRating - oldRate.value + rateDto.value) / (totalRating + 1));
                oldRate.value = rateDto.value;
                this.plateRatingRepository.save(oldRate);


            } else {
                let rate = new PlateRate(rateDto.value, plate, client);
                newRateValue = Math.ceil((plate.rate * totalRating + rate.value) / (totalRating + 1));
                this.plateRatingRepository.save(rate);
            }

            plate.rate = newRateValue;

            this.plateRepository.save(plate);

        }
    }


    async addRestaurantRate(rateDto: RatingDto, client: Client) {


        let restaurant = await this.restaurantRepository.findOne(rateDto.entityId);



        if (!restaurant) {
            throw new InternalServerErrorException();
        }
        else {

            let oldRate = await this.restaurantRatingRepository.findOne({ where: { "restaurant": restaurant, "client": client } });
            let totalRating = await (await this.restaurantRatingRepository.find({ where: { "restaurant": restaurant } })).length;

            let newRateValue: number;

            if (oldRate) {

                newRateValue = Math.ceil((restaurant.rate * totalRating - oldRate.value + rateDto.value) / (totalRating));
                oldRate.value = rateDto.value;
                this.restaurantRatingRepository.save(oldRate);


            } else {
                let rate = new RestaurantRate(rateDto.value, restaurant, client);
                newRateValue = Math.ceil((restaurant.rate * totalRating + rate.value) / (totalRating + 1));
                this.restaurantRatingRepository.save(rate);
            }

            restaurant.rate = newRateValue;
            this.restaurantRepository.save(restaurant);

        }
    }

}