import { EntityRepository, Repository } from "typeorm";
import { Restaurant } from "../entities/restaurant.entity";
import { RestaurantCreationDto } from "../dto/restaurant-creation.dto";
import { Address } from "../../auth/entities/address.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { isEmail, isPhone } from "../../auth/helpers";
import { Owner } from "src/auth/entities/owner.entity";

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {

  async findAll():Promise<Restaurant[]>{

    return Restaurant.find()

  }


  async findOneById(id: number):Promise<Restaurant>{

    return Restaurant.findOne(id)

  }



  async add(restaurantCreationDto: RestaurantCreationDto,owner:Owner) :Promise<null>{
    const {
      name,
      phone,
      governorate,
      municipality,
      street,
      location
    } = restaurantCreationDto;

    const address: Address = new Address(governorate, municipality, street, location);
    let restaurant: Restaurant ;


    try {
      await address.save();
      restaurant = new Restaurant( name,phone,address,0,owner);
      await restaurant.save();
    } catch (error) { 
      console.log(error);
      
       throw new InternalServerErrorException();
    }

    return;

  }


}
