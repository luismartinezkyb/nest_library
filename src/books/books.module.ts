import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { BooksMiddleware } from './books.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(BooksMiddleware).forRoutes('books');
    consumer.apply(BooksMiddleware).forRoutes({
      path: 'books',
      method: RequestMethod.POST,
    });
  }
}
