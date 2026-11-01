import {
  Controller,
  Get,
  Param,
  Header,
  ParseIntPipe,
  StreamableFile,
} from '@nestjs/common';
import { LoremImageService } from './lorem-image.service.js';

@Controller('lorem-image')
export class LoremImageController {
  constructor(private readonly loremImageService: LoremImageService) {}

  @Get()
  @Header('Content-Type', 'image/png')
  async getImage(): Promise<StreamableFile> {
    return await this.loremImageService.generateImage();
  }

  @Get(':width')
  @Header('Content-Type', 'image/png')
  async getImageSquare(
    @Param('width', new ParseIntPipe({ optional: true })) width: number,
  ): Promise<StreamableFile> {
    return await this.loremImageService.generateImage(width);
  }

  @Get(':width/:height')
  @Header('Content-Type', 'image/png')
  async getImageSized(
    @Param('width', new ParseIntPipe({ optional: true })) width: number,
    @Param('height', new ParseIntPipe({ optional: true })) height: number,
  ): Promise<StreamableFile> {
    return await this.loremImageService.generateImage(width, height);
  }

  @Get(':width/:height/:color')
  @Header('Content-Type', 'image/png')
  async getImageColored(
    @Param('width', new ParseIntPipe({ optional: true })) width: number,
    @Param('height', new ParseIntPipe({ optional: true })) height: number,
    @Param('color') color: string,
  ): Promise<StreamableFile> {
    return await this.loremImageService.generateImage(width, height, color);
  }
}
