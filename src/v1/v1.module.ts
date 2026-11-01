import { Module } from '@nestjs/common';
import { V1Controller } from './v1.controller.js';
import { V1Service } from './v1.service.js';
import { UsersModule } from './users/users.module.js';
import { WeatherModule } from './weather/weather.module.js';
import { TodosModule } from './todos/todos.module.js';

@Module({
  controllers: [V1Controller],
  imports: [UsersModule, WeatherModule, TodosModule],
  providers: [V1Service],
})
export class V1Module {}
