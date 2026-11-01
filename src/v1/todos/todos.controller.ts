import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/controllers/base.controller.js';

import { TodosService } from './todos.service.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';

@Controller('v1/todos')
export class TodosController extends BaseController<
  CreateTodoDto,
  UpdateTodoDto
> {
  constructor(todosService: TodosService) {
    super(todosService);
  }
}
