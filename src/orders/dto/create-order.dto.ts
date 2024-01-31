import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  card_hash: string;
}

export class OrderItemDto {
  product_id: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}
