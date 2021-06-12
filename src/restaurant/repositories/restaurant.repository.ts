import { EntityRepository, Repository } from "typeorm";
import { Restaurant } from "../entities/restaurant.entity";
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



  async add(restaurantName:string,owner:Owner) :Promise<null>{
    

    
    let restaurant: Restaurant ;


    try {
      restaurant = new Restaurant( restaurantName,0,owner,owner.address);
      await restaurant.save();
    } catch (error) { 
      console.log(error);
      
       throw new InternalServerErrorException();
    }

    return;

  }


}
