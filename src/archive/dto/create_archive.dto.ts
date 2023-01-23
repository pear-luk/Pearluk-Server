import { Prisma } from '@prisma/client';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class ArchiveInputDTO
  implements Omit<Prisma.ArchiveCreateInput, 'archive_id'>
{
  @IsString()
  title: string;

  @IsInt()
  @Min(2000)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsOptional()
  @IsString()
  introduce?: string;
}
