import { Injectable } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  async create(createBookDto: CreateBookDto) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Book)
      .values([
        {
          name: createBookDto.name,
          author: createBookDto.author,
        },
      ])
      .execute();
    return createBookDto.name;
  }

  async findAll() {
    const books = await getConnection()
      .getRepository(Book)
      .createQueryBuilder('book')
      .getMany();

    return books;
  }

  async findOne(id: number) {
    const book = await getConnection()
      .getRepository(Book)
      .createQueryBuilder('book')
      .where('book.id = :id', { id: id })
      .getOne();
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await getConnection()
      .createQueryBuilder()
      .update(Book)
      .set({
        name: updateBookDto.name,
        author: updateBookDto.author,
        isRead: updateBookDto.isRead,
      })
      .where('book.id = :id', { id: id })
      .execute();
  }

  async remove(id: number) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Book)
      .where('id = :id', { id: id })
      .execute();
  }
}
