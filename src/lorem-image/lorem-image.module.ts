import { Module } from '@nestjs/common';
import { LoremImageController } from './lorem-image.controller.js';
import { LoremImageService } from './lorem-image.service.js';

@Module({
  controllers: [LoremImageController],
  providers: [LoremImageService]
})
export class LoremImageModule {}
