import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurant } from "./restaurant.entity";


@Entity()
export class Plate extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    description: string;


    @Column()
    rate: Number;


    @ManyToOne(() => Restaurant, restaurant => restaurant.plates, { eager: true })
    restaurant:Restaurant;



    constructor(
        name: string,
        description:string,
        rate:Number,
        restaurant:Restaurant
    ) {
        super();
        this.name=name; 
        this.description=description;
        this.rate=rate;
        this.restaurant=restaurant;
    }
}
