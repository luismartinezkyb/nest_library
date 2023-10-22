import { Test, TestingModule } from "@nestjs/testing";
import { BooksService } from "./books.service";
import { beforeEach } from "node:test";
import { getModelToken } from "@nestjs/mongoose";
import { Book, Category } from "./schemas/book.schema";
import { Model } from "mongoose";

describe('Book Service', () => {
  // let booksController: BooksController;
  let booksService: BooksService;
  let model: Model<Book>;

  const mockBook = {
    _id: '6518ee4dfd2d3d675e2f5860',
    title: 'DESCARGAR APP',
    description: 'New Book',
    author: 'Luis Martinez',
    price: 20.01,
    category: Category.FANTASY,
  };

  const mockBookService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookService,
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
  });
  describe('findById', () => {
    it('should find and return a book by Id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockBook);

      const result = await booksService.findById(mockBook._id);

      expect(model.findById).toHaveBeenCalledWith(mockBook._id);
      expect(result).toEqual(mockBook);
    });
  });
});
