import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/entities/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Order } from './entities/order.entity';
import { OrderLine } from './entities/orderLine.entity';
import { OrderingService } from './ordering.service';



@Controller('ordering')
@hasRoles(UserRole.CLIENT)
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderingController {



    constructor(private orderingService: OrderingService) {
    }


    @hasRoles(UserRole.CLIENT)
    @Post('addOrder')
    async addOrder(@Body(ValidationPipe) order: Order,@GetUser() client): Promise<null> {
        order.client=client;
        return await this.orderingService.addOrder(order);
    }


    @hasRoles(UserRole.CLIENT)
    @Get('client/getOrders')
    getOrders(@GetUser() client) {
        return Order.find({"client":client})
    }





}
