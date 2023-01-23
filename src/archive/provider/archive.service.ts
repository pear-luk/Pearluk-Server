import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArchiveRepository } from './archive.repository';

@Injectable()
export class ArchiveService {
  constructor(private readonly archiveRepo: ArchiveRepository) {}

  async createArchive(info: Omit<Prisma.ArchiveCreateInput, 'archive_id'>) {
    const newArchive = await this.archiveRepo.createArchive(info);
    return newArchive;
  }
}
