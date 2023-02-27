import { Controller, Get, Header, Param } from '@nestjs/common';
import GetFileDto from './dto/get-file';
import FileService from './service';

@Controller('files')
export default class FilesController {
  constructor(private readonly fileService: FileService) {}

  @Get(':fileId')
  @Header('Content-Type', 'image/jpeg')
  async getFilePreview(@Param() { fileId }: GetFileDto) {
    return this.fileService.getOneOriginFile(fileId);
  }
}
