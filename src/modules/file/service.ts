import { Injectable, StreamableFile } from '@nestjs/common';
import path from 'node:path';
import fs from 'node:fs';
@Injectable()
export default class FileService {
  // private readonly uploadPath = path.resolve(__dirname, '../../../uploads');
  private readonly uploadPath =
    '/Users/zhangkaiyang/Documents/workspace/zzu_best/salted-fish-service-client/uploads';

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath);
    }
  }

  async getOneOriginFile(fileId: string): Promise<StreamableFile> {
    const filePath = path.join(this.uploadPath, fileId);
    const createStream = fs.createReadStream(filePath);
    return new StreamableFile(createStream);
  }
}
