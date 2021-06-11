import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Plate } from "src/restaurant/entities/plate.entity";
import { Client } from "src/auth/entities/client.entity";


@Entity()
export class PlateRate extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rate: number;


    @ManyToOne(() => Plate, plate => plate.ratings, { eager: true })
    plate: Plate;



    @ManyToOne(() => Client, client => client.platesRatings, { eager: true })
    client: Client;




    constructor(
        rate:number,
        plate:Plate,
        client:Client,
    ) {
        super();

        this.rate = rate;
        this.plate = plate;
        this.client = client;


    }
}
