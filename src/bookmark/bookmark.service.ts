import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/';
import { UpdateBookmarkDto } from './dto/';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createBookmarkDto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...createBookmarkDto,
      },
    });

    return bookmark;
  }

  findAll(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(userId: number, id: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        userId,
        id,
      },
    });
  }

  async update(
    userId: number,
    id: number,
    updateBookmarkDto: UpdateBookmarkDto,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to this resource is denied');
    }

    return this.prisma.bookmark.update({
      where: {
        id,
      },
      data: {
        ...updateBookmarkDto,
      },
    });
  }

  async remove(userId: number, id: number): Promise<void> {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to this resource is denied');
    }

    await this.prisma.bookmark.delete({
      where: {
        id,
      },
    });
  }
}
