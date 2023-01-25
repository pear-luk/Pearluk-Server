import { Module } from '@nestjs/common';
import { ArchiveController } from './archive.controller';
import { ArchiveRepository } from './provider/archive.repository';
import { ArchiveService } from './provider/archive.service';

@Module({
  imports: [],
  providers: [ArchiveService, ArchiveRepository],
  controllers: [ArchiveController],
  exports: [ArchiveService, ArchiveRepository],
})
export class ArchiveModule {}
