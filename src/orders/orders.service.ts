import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const productIds = createOrderDto.items.map((item) => item.product_id);
    const uniqueProductsIds = [...new Set(productIds)];
    const products = await this.productRepo.findBy({
      id: In(productIds),
    });

    if (products.length !== uniqueProductsIds.length) {
      throw new Error('Some porducts do not exist');
    }

    const order = Order.create({
      client_id: 1,
      items: createOrderDto.items.map((item) => {
        const product = products.find(
          (product) => product.id == item.product_id,
        );
        return {
          price: product.price,
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });
    return await this.orderRepo.save(order);
  }

  async findAll() {
    return await this.orderRepo.find();
  }

  findOne(id: string) {
    return this.orderRepo.findBy({ id });
  }
}
