import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADVENTURE = 'ADVENTURE',
  CLASSICS = 'CLASSICS',
  CRIME = 'CRIME',
  FANTASY = 'FANTASY',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop({
    required: true,
  })
  title: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  price: number;
  @Prop()
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
