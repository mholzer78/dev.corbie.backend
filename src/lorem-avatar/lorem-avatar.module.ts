import { Module } from '@nestjs/common';
import { LoremAvatarService } from './lorem-avatar.service.js';
import { LoremAvatarController } from './lorem-avatar.controller.js';

@Module({
  controllers: [LoremAvatarController],
  providers: [LoremAvatarService],
})
export class LoremAvatarModule {}
