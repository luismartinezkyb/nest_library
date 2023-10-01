import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsIn([
    Category.ADVENTURE,
    Category.CLASSICS,
    Category.CRIME,
    Category.FANTASY,
  ])
  @IsNotEmpty()
  category: Category;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsIn([
    Category.ADVENTURE,
    Category.CLASSICS,
    Category.CRIME,
    Category.FANTASY,
  ])
  @IsOptional()
  category?: Category;
}
