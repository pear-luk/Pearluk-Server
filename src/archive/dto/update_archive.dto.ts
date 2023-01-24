import { PartialType } from '@nestjs/swagger';
import { E_status, Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';
import { ArchiveCreateInputDTO } from './create_archive.dto';

export class ArchiveUpdateInputDTO
  extends PartialType(ArchiveCreateInputDTO)
  implements Prisma.ArchiveUpdateInput
{
  @IsOptional()
  title?: string;

  @IsOptional()
  year?: number;

  @IsOptional()
  introduce?: string;
}

export class ArchiveUpdateParamsDTO implements Prisma.ArchiveWhereUniqueInput {
  @IsULID()
  archive_id: string;
}

export class ArchiveUpdateResponseDTO {
  archive_id: string;
  title: string;
  year: number;
  introduce?: string;
}
export const ArchiveUpdateResponseEX = {
  archive_id: '01GQFWTFS8XMHCC2RZY4P7HZ84',
  title: 'zl존흑기sr 컬렉션',
  year: 2023,
  introduce: '지존 흑기사의 악세사리 컬렉션',
  status: E_status.ACTIVE,
};
export const ArchiveDeleteResponseEX = {
  archive_id: '01GQFWTFS8XMHCC2RZY4P7HZ84',
  title: 'zl존흑기sr 컬렉션',
  year: 2023,
  introduce: '지존 흑기사의 악세사리 컬렉션',
  status: E_status.DELETED,
};
