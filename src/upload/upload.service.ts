import { BadRequestException, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadQuestionImgs(imgs: Express.MulterS3.File[], question_id: string) {
    if (!imgs) {
      //임시 에러
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    const newImgs = await this.prisma.questionImg.createMany({
      data: imgs.map((img, i) => ({
        question_img_id: ulid(),
        question_id,
        sequence: i + 1,
        url: img.location,
      })),
    });
    return newImgs;
  }
  async uploadProductImgs(imgs: Express.MulterS3.File[], product_id: string) {
    if (!imgs) {
      //임시 에러
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    const newImgs = await this.prisma.productImg.createMany({
      data: imgs.map((img, i) => ({
        product_img_id: ulid(),
        product_id,
        sequence: i + 1,
        url: img.location,
      })),
    });
    return newImgs;
  }

  uploadFile(file: Express.MulterS3.File) {
    console.log(file);
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return { filePath: file.location };
  }
}
