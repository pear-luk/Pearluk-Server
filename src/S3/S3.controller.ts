import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './../common/options/multer.options';

import { S3Service } from './S3.service';

/**
 * 이미지 업로드를 할때
 * ex)
 * 상품등록 -> 상품등록 API -> 등록된 상품정보 res
 * -> res안에 있는 id 값을 기반으로 이미지 업로드 API 호출.
 */

@Controller('/upload')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('/qustion')
  @UseInterceptors(FilesInterceptor('imgs', 10, multerOptions('products')))
  async uploaFiles(@UploadedFiles() files: Array<Express.MulterS3.File>) {
    console.log(files);

    return this.s3Service.uploadFiles(files);
  }
  // @Post('/qustion')
  // @UseInterceptors(FileInterceptor('imgs'))
  // async uploaFile(@UploadedFile() file: Express.MulterS3.File) {
  //   console.log(file);

  //   return this.s3Service.uploadFile(file);
  // }
}
