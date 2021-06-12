import { PlateRate } from "src/rating/entities/plateRate.entity";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
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
    rate: number;


    @Column()
    price: number;


    @ManyToOne(() => Restaurant, restaurant => restaurant.plates, { eager: true ,onDelete:'CASCADE'})
    restaurant:Restaurant;

    @OneToMany(()=>PlateRate,plateRate=>plateRate.plate)
    ratings:PlateRate[];



    constructor(
        name: string,
        description:string,
        rate:number,
        price:number,
        restaurant:Restaurant
    ) {
        super();
        this.name=name; 
        this.description=description;
        this.rate=rate;
        this.price=price;
        this.restaurant=restaurant;
    }
}
