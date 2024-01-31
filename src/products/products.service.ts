import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private ProductRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.ProductRepo.create(createProductDto);
    return this.ProductRepo.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.ProductRepo.find();
  }

  findOne(id: string) {
    return this.ProductRepo.findOne({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.ProductRepo.update({ id }, updateProductDto);
  }

  remove(id: string) {
    return this.ProductRepo.delete({ id });
  }
}
