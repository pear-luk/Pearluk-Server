import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  uploadFiles(files: Express.MulterS3.File[]) {
    if (!files) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return { filePath: files.map((f) => f.location) };
  }
  uploadFile(file: Express.MulterS3.File) {
    console.log(file);
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return { filePath: file.location };
  }
}
