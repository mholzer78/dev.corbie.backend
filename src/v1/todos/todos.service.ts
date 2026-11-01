import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service.js';

import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { Todo } from './entities/todo.entity.js';
import { todoEntries } from './entities/todo.entries.js';

import { progLanguages } from '../../common/utils/dummyData.utils.js';

@Injectable()
export class TodosService extends BaseService<
  Todo,
  CreateTodoDto,
  UpdateTodoDto
> {
  maxRandomSize = 25;

  constructor() {
    super(todoEntries, (id, dto) => ({
      id,
      ...dto,
    }));
  }

  generateRandom(size?: number) {
    const amount = size ? size : 1;
    const randomEntries = [];
    for (let i = 0; i < amount; i++) {
      const entry: Todo = {
        id: i + 1,
        name: 'learn ' + progLanguages[i],
        completed: Math.random() < 0.5,
        userId: Math.floor(Math.random() * 50),
      };
      randomEntries.push(entry);
    }
    return randomEntries;
  }
}
