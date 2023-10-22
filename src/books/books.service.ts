import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto, UpdateBookDto } from './dtos/books.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }
  async createBook(book: CreateBookDto): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }
    const res = await this.bookModel.findById(id);
    if (!res) {
      throw new NotFoundException('Book not found');
    }
    return res;
  }
  async updateById(id: string, book: UpdateBookDto): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Book> {
    const res = await this.bookModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException('Book not found');
    }
    return res;
  }
}
