import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ProductsModule,
    BooksModule,
  ],

  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}
