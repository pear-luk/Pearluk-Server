import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { ArchiveRepository } from './archive.repository';

@Injectable()
export class ArchiveService {
  constructor(private readonly archiveRepo: ArchiveRepository) {}

  async createArchive(info: Omit<Prisma.ArchiveCreateInput, 'archive_id'>) {
    const { title } = info;

    const exist = await this.archiveRepo.findOneArcive({ title });
    if (exist) {
      throw new BadRequestException(baseResponeStatus.ARCHIVE_EXIST);
    }
    const newArchive = await this.archiveRepo.createArchive(info);
    return newArchive;
  }
}
