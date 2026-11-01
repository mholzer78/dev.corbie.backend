import path from 'node:path';
import { Injectable, StreamableFile } from '@nestjs/common';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import {
  svgToStreamablePng,
  validateColor,
} from '../common/utils/svg.utils.js';

const execAsync = promisify(exec);

@Injectable()
export class LoremAvatarService {
  generateImage(color?: string, background?: string): Promise<StreamableFile> {
    const fgColor = validateColor(color, '444444');
    const bgColor = validateColor(background, 'ffffff');
    let imgSvg =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      `<svg viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#${bgColor}" width="640" height="640" />
            <g stroke="none" stroke-width="10">
                <g fill="#${fgColor}">
                    <circle cx="315" cy="370" r="250" />
                    <circle cx="315" cy="220" r="200" />
                </g>
                <g fill="#${bgColor}">
                    <circle cx="240" cy="175" r="70" />
                    <circle cx="390" cy="175" r="70" />
                </g>
            </g>
            <circle fill="#${fgColor}" cx="240" cy="175" r="40" />
            <circle fill="#${fgColor}" cx="390" cy="175" r="40" />
            <path d="m190 370c0-175 250-175 250 0l-125 250z" fill="#${bgColor}" stroke="none"
                stroke-linejoin="round" stroke-width="10" />
        </svg>
    `;

    return svgToStreamablePng(imgSvg);
  }
}
