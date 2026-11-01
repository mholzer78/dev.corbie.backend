import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LoremImageModule } from './lorem-image/lorem-image.module.js';
import { LoremAvatarModule } from './lorem-avatar/lorem-avatar.module.js';
import { V1Module } from './v1/v1.module.js';

/*
    GET: get data
    POST: create data
    PUT: replace data
    PATCH: update data
    DELETE: delete data
*/

@Module({
  imports: [LoremImageModule, LoremAvatarModule, V1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
