import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';
import {
  ArchiveUpdateInputDTO,
  ArchiveUpdateParamsDTO,
} from './../dto/update_archive.dto';

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

  async updateArchive(info: ArchiveUpdateInputDTO & ArchiveUpdateParamsDTO) {
    const { archive_id, ...data } = info;
    const updatedArchive = await this.prisma.archive.update({
      where: { archive_id },
      data,
    });
    return updatedArchive;
  }

  async deleteStatusArchive(info: ArchiveUpdateParamsDTO) {
    const { archive_id } = info;
    const deletedArchie = await this.prisma.archive.update({
      where: { archive_id },
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedArchie;
  }
}
