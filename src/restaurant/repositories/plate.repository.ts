import { EntityRepository, Repository } from "typeorm";
import { Restaurant } from "../entities/restaurant.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Owner } from "src/auth/entities/owner.entity";
import { PlateCreationDto } from "../dto/plate-creation.dto";
import { Plate } from "../entities/plate.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(Restaurant)
export class PlateRepository extends Repository<Plate> {



  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {
    super();
  }


  async findAll(): Promise<Plate[]> {

    return Plate.find()

  }

  async add(plateCreationDto, restaurant): Promise<null> {



    const {
      name,
      description,
      price,
    } = plateCreationDto;

    let plate: Plate;




    try {
      plate = new Plate(
        name,
        description,
        0,
        price,
        restaurant,
      );
      await plate.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }

    return;

  }


}
