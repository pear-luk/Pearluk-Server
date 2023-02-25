import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multerS3 from 'multer-s3';
import { basename, extname } from 'path';

export const multerOptionsFactory = (
  configService: ConfigService,
): MulterOptions => {
  // s3 인스턴스를 생성합니다.
  const s3 = new S3Client({
    region: configService.get('S3_BUCKET_REGION'),
    credentials: {
      accessKeyId: configService.get('S3_ACCESS_KEY'),
      secretAccessKey: configService.get('S3_ACCESS_SECRET_KEY'),
    },
  });

  return {
    storage: multerS3({
      s3,
      bucket: configService.get('S3_BUCKET_NAME'),

      key(
        _req: any,
        file: { originalname: string },
        done: (arg0: any, arg1: string) => void,
      ) {
        const ext = extname(file.originalname); // 파일의 확장자 추출
        // console.log(ext);
        const _basename = basename(file.originalname, ext); // 파일 이름
        // 파일 이름이 중복되는 것을 방지하기 위해 파일이름_날짜.확장자 형식으로 설정합니다.
        done(null, `${_basename}_${Date.now()}${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};

export const multerOptions = (folder?: string) => {
  const configService = new ConfigService();
  const s3 = new S3Client({
    region: configService.get('S3_BUCKET_REGION'),
    credentials: {
      accessKeyId: configService.get('S3_ACCESS_KEY'),
      secretAccessKey: configService.get('S3_ACCESS_SECRET_KEY'),
    },
  });

  return {
    storage: multerS3({
      s3,
      bucket: configService.get('S3_BUCKET_NAME'),

      key(
        _req: any,
        file: { originalname: string },
        done: (arg0: any, arg1: string) => void,
      ) {
        const ext = extname(file.originalname); // 파일의 확장자 추출
        // console.log(ext);
        const _basename = basename(file.originalname, ext); // 파일 이름
        // 파일 이름이 중복되는 것을 방지하기 위해 파일이름_날짜.확장자 형식으로 설정합니다.
        done(
          null,
          `${folder ? `${folder}/` : ''}${_basename}_${Date.now()}${ext}`,
        );
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};
