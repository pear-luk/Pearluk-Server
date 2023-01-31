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
