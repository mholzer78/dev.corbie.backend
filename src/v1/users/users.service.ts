import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service.js';

import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { userEntries } from './entities/user.entries.js';

import {
  firstNames,
  lastNames,
  topLevelDomains,
  streets,
  cities,
} from '../../common/utils/dummyData.utils.js';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  maxRandomSize = 25;

  constructor() {
    super(userEntries, (id, dto) => ({
      id,
      ...dto,
    }));
  }

  generateRandom(size?: number) {
    const amount = Math.min(size || 1, this.maxRandomSize);

    const randomEntries: User[] = [];

    for (let i = 0; i < amount; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

      const entry: User = {
        id: i + 1,
        name: `${firstName} ${lastName}`,
        email:
          `${firstName[0].toLowerCase()}.${lastName.toLowerCase()}@example.` +
          topLevelDomains[Math.floor(Math.random() * topLevelDomains.length)],
        avatar: 'http://localhost:3000/lorem-avatar',
        address:
          `${streets[Math.floor(Math.random() * streets.length)]} ` +
          `${Math.floor(Math.random() * 100)}, ` +
          `${Math.floor(Math.random() * 99999)} ` +
          cities[Math.floor(Math.random() * cities.length)],
      };

      randomEntries.push(entry);
    }

    return randomEntries;
  }
}
