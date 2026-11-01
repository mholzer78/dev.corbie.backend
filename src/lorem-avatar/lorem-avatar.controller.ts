import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { LoremAvatarService } from './lorem-avatar.service.js';

@Controller('lorem-avatar')
export class LoremAvatarController {
  constructor(private readonly loremAvatarService: LoremAvatarService) {}

  @Get()
  @Header('Content-Type', 'image/png')
  async getImage(): Promise<StreamableFile> {
    return await this.loremAvatarService.generateImage();
  }

  @Get(':color')
  @Header('Content-Type', 'image/png')
  async getImageColored(
    @Param('color') color: string,
  ): Promise<StreamableFile> {
    return await this.loremAvatarService.generateImage(color);
  }

  @Get(':color/:bgColor')
  @Header('Content-Type', 'image/png')
  async getImageWithBgColor(
    @Param('color') color: string,
    @Param('bgColor') bgColor: string,
  ): Promise<StreamableFile> {
    return await this.loremAvatarService.generateImage(color, bgColor);
  }
}
