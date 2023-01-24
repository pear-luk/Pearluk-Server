import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import {
  ArchiveUpdateInputDTO,
  ArchiveUpdateParamsDTO,
} from './../dto/update_archive.dto';
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

  async updateArchive(info: ArchiveUpdateInputDTO & ArchiveUpdateParamsDTO) {
    const { title, archive_id } = info;

    const titleExist = title
      ? await this.archiveRepo.findOneArcive({ title })
      : false;
    if (titleExist) {
      throw new BadRequestException(baseResponeStatus.ARCHIVE_EXIST);
    }

    const exist = await this.archiveRepo.findOneArcive({ archive_id });
    if (!exist) {
      throw new BadRequestException(baseResponeStatus.ARCHIVE_NOT_EXIST);
    }

    const updateArchive = await this.archiveRepo.updateArchive(info);

    return updateArchive;
  }
}
