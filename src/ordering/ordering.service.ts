import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Order } from "./entities/order.entity";
import { OrderLine } from "./entities/orderLine.entity";


@Injectable()
export class OrderingService {


    async addOrder(order: Order): Promise<null> {
        order.approved = false;

        Order.save(order);
        order.orderLines.forEach((line) => {
            line.order = order;
            OrderLine.save(line)
        });




        return;
    }

    async approveOrder(orderId, owner) {
        let order = await Order.findOne(orderId);

        if (!order ||  order.restaurant.owner.id!=owner.id)
            throw new UnauthorizedException('Unauthorized');
        else{

            order.approved=true;
            Order.save(order);
        }
    }


    async disapproveOrder(orderId, owner) {
        let order = await Order.findOne(orderId);

        if (!order ||  order.restaurant.owner.id!=owner.id)
            throw new UnauthorizedException('Unauthorized');
        else{

            order.approved=false;
            Order.save(order);
        }
    }

}