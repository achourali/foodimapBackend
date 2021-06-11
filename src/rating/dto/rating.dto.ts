import { IsNumber, IsString } from "class-validator";
export class RatingDto{

  @IsNumber()
  value :number;

  
  @IsNumber()
  entityId :number;

}
