import {
  Controller,
  Param,
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
  constructor(private readonly uploadService: UploadService) {}

  @Post('/questions/:question_id')
  @UseInterceptors(FilesInterceptor('imgs', 10, multerOptions('questions')))
  async uploadQustionImg(
    @UploadedFiles() files: Array<Express.MulterS3.File>,
    @Param('question_id') question_id: string,
  ) {
    return await this.uploadService.uploadQuestionImgs(files, question_id);
  }
  @Post('/products/:product_id')
  @UseInterceptors(FilesInterceptor('imgs', 10, multerOptions('questions')))
  async uploadProductImg(
    @UploadedFiles() files: Array<Express.MulterS3.File>,
    @Param('product_id') product_id: string,
  ) {
    return await this.uploadService.uploadProductImgs(files, product_id);
  }
}
