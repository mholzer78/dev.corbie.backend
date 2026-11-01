import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CrudService } from '../interfaces/crud-service.interface.js';

export class BaseController<TCreateDto, TUpdateDto> {
  constructor(
    protected readonly service: CrudService<TCreateDto, TUpdateDto>,
  ) {}

  @Get()
  getAll(@Query('name') name: string = '') {
    return this.service.getAll(name);
  }

  @Get('random')
  getRandom() {
    return this.service.generateRandom();
  }

  @Get('random/:size')
  getRandomWithSize(@Param('size', ParseIntPipe) size: number) {
    return this.service.generateRandom(size);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.getOne(id);
  }

  @Post()
  create(@Body() dto: TCreateDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  replace(@Param('id', ParseIntPipe) id: number, @Body() dto: TCreateDto) {
    return this.service.replace(id, dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: TUpdateDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
