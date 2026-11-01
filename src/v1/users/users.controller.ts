import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/controllers/base.controller.js';

import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('v1/users')
export class UsersController extends BaseController<
  CreateUserDto,
  UpdateUserDto
> {
  constructor(usersService: UsersService) {
    super(usersService);
  }
}
