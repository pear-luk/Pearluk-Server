import { BadRequestException, Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { PrismaService } from './../../prisma/prisma.service';
import {
  ArchiveUpdateInputDTO,
  ArchiveUpdateParamsDTO,
} from './../dto/update_archive.dto';
import { ArchiveRepository } from './archive.repository';

@Injectable()
export class ArchiveService {
  constructor(
    private readonly archiveRepo: ArchiveRepository,
    private readonly prisma: PrismaService,
  ) {}

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

    const updatedArchive = await this.archiveRepo.updateArchive(info);

    return updatedArchive;
  }

  async deleteStatusArchive(info: ArchiveUpdateParamsDTO) {
    const { archive_id } = info;

    const exist = await this.archiveRepo.findOneArcive({ archive_id });
    if (!exist) {
      throw new BadRequestException(baseResponeStatus.ARCHIVE_NOT_EXIST);
    }
    const archiveProducts = await this.prisma.product.findMany({
      where: {
        archive_id: exist.archive_id,
        status: E_status.ACTIVE,
      },
    });
    if (archiveProducts.length > 0) {
      throw new BadRequestException('아카이브 상품들을 모두 제거해주세요');
    }
    const deletedArchive = await this.archiveRepo.deleteStatusArchive(info);
    return deletedArchive;
  }

  async getArchiveListAll() {
    return await this.archiveRepo.getArchiveListAll();
  }
}
