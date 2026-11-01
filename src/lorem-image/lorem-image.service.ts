import { Injectable, StreamableFile } from '@nestjs/common';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';

import cbLoremImage from '@corbie.dev/lorem-image';
import {
  svgToStreamablePng,
  validateColor,
} from '../common/utils/svg.utils.js';

@Injectable()
export class LoremImageService {
  generateImage(
    width?: number,
    height?: number,
    color?: string,
  ): Promise<StreamableFile> {
    const validWidth = this.validateDimension(width, 300);
    const validHeight = this.validateDimension(height, validWidth);
    const validColor = validateColor(color, '778899');

    const imgSvg = cbLoremImage.svgAsXml(validWidth, validHeight, validColor);

    const pngPromise = svgToStreamablePng(imgSvg);

    return pngPromise;
  }

  private validateDimension(
    value: number | undefined,
    fallback: number,
  ): number {
    if (
      typeof value === 'number' &&
      !isNaN(value) &&
      value >= 10 &&
      value <= 3840
    ) {
      return value;
    }
    return fallback;
  }
}
