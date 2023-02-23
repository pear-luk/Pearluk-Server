import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/options/multer.options';
import { UploadService } from './upload.service';

/**
 * 이미지 업로드를 할때
 * ex)
 * 상품등록 -> 상품등록 API -> 등록된 상품정보 res
 * -> res안에 있는 id 값을 기반으로 이미지 업로드 API 호출.
 */

@Controller('/upload')
export class UploadController {
  constructor(private readonly s3Service: UploadService) {}

  @Post('/question/:question_id')
  @UseInterceptors(FilesInterceptor('imgs', 10, multerOptions('products')))
  async uploadQustionImg(@UploadedFiles() files: Array<Express.MulterS3.File>) {
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
