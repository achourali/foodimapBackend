import { Order } from "src/ordering/entities/order.entity";
import { RestaurantRate } from "src/rating/entities/restaurantRate.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Address } from "../../auth/entities/address.entity";
import { Owner } from "../../auth/entities/owner.entity";
import { Plate } from "./plate.entity";


@Entity()
export class Restaurant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    rate: number;

    @Column('varchar', { length: 8, unique: true, nullable: false })
    phone: string;


    @OneToOne(() => Address, (address) => address.restaurant, { eager: true })
    @JoinColumn()
    address: Address;


    @ManyToOne(() => Owner, owner => owner.restaurants, { eager: true })
    owner: Owner;

    @OneToMany(() => Plate, plate => plate.restaurant)
    plates: Plate[];


    @OneToMany(() => RestaurantRate, restaurantRate => restaurantRate.restaurant)
    ratings: RestaurantRate[];


    @OneToMany(() => Order, order => order.restaurant)
    orders: Order[];



    constructor(
        name: string,
        phone: string,
        address: Address,
        rate: number,
        owner: Owner
    ) {
        super();
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.rate = rate;
        this.owner = owner;
    }
}
