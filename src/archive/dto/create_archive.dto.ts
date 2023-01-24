import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class ArchiveCreateInputDTO
  implements Omit<Prisma.ArchiveCreateInput, 'archive_id'>
{
  @ApiProperty({
    name: 'title',
    description: '아카이브 이름',
  })
  @IsString()
  title: string;

  @ApiProperty({
    name: 'year',
    description: '아카이브 해당 년도',
  })
  @IsInt()
  @Min(2000)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @ApiProperty({
    name: 'introduce',
    description: '아카이브 설명',
  })
  @IsOptional()
  @IsString()
  introduce?: string;
}
export class ArchiveCreateResponseDTO {
  archive_id: string;
  title: string;
  year: number;
  introduce?: string;
}
export const ArchiveCreateResponseEX = {
  archive_id: '01GQFWTFS8XMHCC2RZY4P7HZ84',
  title: 'zl존흑기sr 컬렉션',
  year: 2023,
  introduce: '지존 흑기사의 악세사리 컬렉션',
};
