import { Module } from '@nestjs/common';
import { ArchiveController } from './archive.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [ArchiveController],
  exports: [],
})
export class ArchiveModule {}
