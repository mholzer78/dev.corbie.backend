import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service.js';

import { CreateWeatherDto } from './dto/create-weather.dto.js';
import { UpdateWeatherDto } from './dto/update-weather.dto.js';
import { Weather } from './entities/weather.entity.js';
import { weatherEntries } from './entities/weather.entries.js';

import {
  cities,
  weatherConditions,
} from '../../common/utils/dummyData.utils.js';

@Injectable()
export class WeatherService extends BaseService<
  Weather,
  CreateWeatherDto,
  UpdateWeatherDto
> {
  maxRandomSize = 25;

  constructor() {
    super(weatherEntries, (id, dto) => ({
      id,
      ...dto,
    }));
  }

  generateRandom(size?: number) {
    const amount = size ? size : 1;
    const randomEntries = [];
    for (let i = 0; i < amount; i++) {
      const entry: Weather = {
        id: i + 1,
        name: cities[Math.floor(Math.random() * cities.length)],
        temperature: Math.floor(Math.random() * 30) - 10,
        condition:
          weatherConditions[
            Math.floor(Math.random() * weatherConditions.length)
          ],
        humidity: Math.floor(Math.random() * 100),
      };
      randomEntries.push(entry);
    }
    return randomEntries;
  }
}
