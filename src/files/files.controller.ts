import { Controller, Get, Param, Post, Response, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import path from 'path';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File | Express.MulterS3.File
  ) {
    return this.filesService.uploadFile(file);
  }

  @Get(':section/:fileBasename')
  download(@Param('section') section, @Param('fileBasename') fileBasename, @Response() response) {
    const rootDir = path.join('.', 'files', section);

    const options = {
      root: rootDir,
      dotfiles: 'deny'
    };

    return response.sendFile(fileBasename, options);
  }
}
