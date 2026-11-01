import { Controller } from '@nestjs/common';
import { BaseController } from '../../common/controllers/base.controller.js';

import { WeatherService } from './weather.service.js';
import { CreateWeatherDto } from './dto/create-weather.dto.js';
import { UpdateWeatherDto } from './dto/update-weather.dto.js';

@Controller('v1/weather')
export class WeatherController extends BaseController<
  CreateWeatherDto,
  UpdateWeatherDto
> {
  constructor(weatherService: WeatherService) {
    super(weatherService);
  }
}
