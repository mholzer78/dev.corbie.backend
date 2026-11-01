import path from 'node:path';
import { InternalServerErrorException, StreamableFile } from '@nestjs/common';
import fs from 'node:fs/promises';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import * as crypto from 'node:crypto';

import { createReadStream } from 'node:fs';

const execAsync = promisify(exec);
const HEX_COLOR_REGEX = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export async function svgToStreamablePng(
  imgSvg: string,
): Promise<StreamableFile> {
  const randomId = crypto.randomBytes(20).toString('hex');
  const svgPath = path.join(process.cwd(), 'temp', `${randomId}.svg`);
  const pngPath = path.join(process.cwd(), 'temp', `${randomId}.png`);

  try {
    await fs.mkdir(path.join(process.cwd(), 'temp'), { recursive: true });
    await fs.writeFile(svgPath, imgSvg);

    await execAsync(`rsvg-convert "${svgPath}" -o "${pngPath}"`);
    const fileStream = createReadStream(pngPath);

    fileStream.on('close', async () => {
      try {
        await Promise.all([
          fs.unlink(svgPath).catch(() => {}),
          fs.unlink(pngPath).catch(() => {}),
        ]);
        console.log('Cleanup finished safely.');
      } catch (err) {
        console.error('Failed to clean up temp files:', err);
      }
    });

    return new StreamableFile(fileStream);
  } catch (error) {
    await Promise.all([
      fs.unlink(svgPath).catch(() => {}),
      fs.unlink(pngPath).catch(() => {}),
    ]);
    console.error('Conversion failed:', error);
    throw new InternalServerErrorException('Failed to process image');
  }
}

export function validateColor(
  color: string | undefined,
  fallback: string,
): string {
  if (!color) return fallback;
  if (color.length === 3) {
    color = color
      .split('')
      .map((char) => char + char)
      .join('');
  }
  if (HEX_COLOR_REGEX.test(color)) return color;
  return fallback;
}
