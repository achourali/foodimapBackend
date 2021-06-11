import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isInstance } from "class-validator";
import { Client } from "src/auth/entities/client.entity";
import { Plate } from "src/restaurant/entities/plate.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { Repository } from "typeorm";
import { RatingDto } from "./dto/rating.dto";
import { PlateRate } from "./entities/plateRate.entity";


@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(PlateRate)
        private plateRatingRepository: Repository<PlateRate>,
        @InjectRepository(Plate)
        private plateRepository: Repository<Plate>,

    ) { }

    async addPlateRate(rateDto: RatingDto, client: Client) {

        let plate = await this.plateRepository.findOne(rateDto.entityId);

        if (!plate)
            throw new InternalServerErrorException();
        else {
            let totalRating= await (await this.plateRatingRepository.find({where:{"plate":plate}})).length;

            let rate = new PlateRate(rateDto.value, plate, client);
            plate.rate=Math.floor((plate.rate*totalRating+rate.rate)/(totalRating+1));
            
            this.plateRepository.save(plate);
            this.plateRatingRepository.save(rate)

        }
    }

}