import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Plate } from "src/restaurant/entities/plate.entity";
import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";



@Entity()
export class OrderLine extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(()=>Order,order=>order.orderlines)
    order:Order;

    @IsNotEmpty()
    @IsNumber()
    quantity:Number;

    @IsNotEmpty()
    @ManyToOne(()=>Plate,plate=>plate.orderLines)
    plate:Plate


}
