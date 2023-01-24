import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class ArchiveRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneArcive(info: Prisma.ArchiveWhereInput) {
    const archive = await this.prisma.archive.findFirst({ where: info });
    return archive;
  }

  async createArchive(info: Omit<Prisma.ArchiveCreateInput, 'archive_id'>) {
    const newArchive = await this.prisma.archive.create({
      data: { archive_id: ulid(), ...info },
    });

    return newArchive;
  }
}
