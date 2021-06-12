import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Order } from "./entities/order.entity";
import { OrderLine } from "./entities/orderLine.entity";


@Injectable()
export class OrderingService {


    async addOrder(order: Order): Promise<null> {
       
            Order.save(order)
            order.orderlines.forEach((line) => {
                line.order = order;
                OrderLine.save(line)
            });

      

        return;
    }

}