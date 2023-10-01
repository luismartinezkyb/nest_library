import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto, UpdateBookDto } from './dtos/books.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(book);
  }

  @Get(':id')
  getOneBook(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() book: UpdateBookDto) {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteById(id);
  }
}
