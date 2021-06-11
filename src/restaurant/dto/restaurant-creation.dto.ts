import {
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Length,
  Matches,
  Validate
} from "class-validator";
import { IsNotBlank } from "../../custom-validators/isNotBlank.validator";
import { ValidGovernorate } from "../../custom-validators/governorate.validator";
import { ValidMunicipality } from "../../custom-validators/municipality.validator";



export class RestaurantCreationDto {

  @IsNotBlank()
  @IsString()
  @MinLength(4, { message: "name must be at least 4 characters long." })
  @MaxLength(20, { message: "name must be at most 20 characters long." })
  name: string;

  @IsNotBlank({ message: "Password field can't be empty." })
  @IsString()
  @Matches(/^\d{8}$/,{message : 'invalid phone number'})
  @Length(8, 8, { message: "Phone number must be 8 characters long!" })
  phone: string;

  @IsNotBlank({ message: "governorate field can't be empty." })
  @Validate(ValidGovernorate,{ message: "governorate is not supported!" })
  @IsString()
  governorate: string;

  @IsNotBlank({ message: "municipality field can't be empty." })
  @ValidMunicipality('governorate',{message : 'governorate and municipality doesn\'t match.'})
  @IsString()
  municipality: string;

  @IsNotBlank({ message: "street field can't be empty." })
  @IsString()
  street: string;

  @IsNotBlank({ message: "location field can't be empty." })
  @IsString()
  location: string;


}
