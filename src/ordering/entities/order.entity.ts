import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Client } from "src/auth/entities/client.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderLine } from "./orderLine.entity";





@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Type(()=>OrderLine)
    @ValidateNested({ each: true })
    @OneToMany(()=>OrderLine,orderLine=>orderLine.order,{eager:true})
    orderLines:OrderLine[];


    @ManyToOne(() => Client, client => client.orders, { eager: true })
    client: Client;


    @IsNotEmpty()
    @ManyToOne(() => Restaurant, restaurant => restaurant.orders, { eager: true })
    restaurant: Restaurant;


    @IsString()
    @Column()
    description: string;




    constructor(
        orderlines:OrderLine[],
        client: Client,
        description: string,

    ) {
        super();

        this.orderLines = orderlines;
        this.description = description;
        this.client = client;


    }
}