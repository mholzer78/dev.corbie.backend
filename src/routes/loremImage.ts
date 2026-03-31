import path from 'node:path';
import express, { Request, Response, NextFunction } from 'express';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import * as crypto from 'node:crypto';

import cbLoremImage from '@corbie.dev/lorem-image';

const execAsync = promisify(exec);
const router = express.Router();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

type InputType =
    | [number]
    | [number, string | number]
    | [number, string | number, string | number];

router.get(
    ['/', '/*options'],
    async (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*');

        let params = req.path.split('/');
        params.shift();

        let width: number = 0;
        let height: number | undefined = undefined;
        let color: string | undefined = undefined;

        if (params[0]) {
            width = Number(params[0]);
        } else {
            width = 400;
            height = 300;
        }
        if (params[1] && !Number.isNaN(Number(params[1]))) {
            height = Number(params[1]);
        } else if (params[1]) {
            color = params[1];
        }
        if (params[2]) {
            color = params[2];
        }

        let options: InputType;

        if (height) {
            options = [width, height, color!];
        } else if (color) {
            options = [width, color];
        } else {
            options = [width];
        }

        const filename = path.join(
            __dirname,
            'temp-' + crypto.randomBytes(20).toString('hex'),
        );
        const imgSvg = cbLoremImage.svgAsXml(...options);

        try {
            await fs.writeFile(filename + '.svg', imgSvg);
            console.log('Writing finished');
        } catch (error) {
            console.error('Writing failed:', error);
        }

        try {
            let { stderr } = await execAsync(
                'rsvg-convert "' + filename + '.svg" -o "' + filename + '.png"',
            );
            if (stderr) {
                console.error('Error:', stderr);
            }
            console.log('Convert finished');
        } catch (error) {
            console.error('Convert failed:', error);
        }

        res.sendFile(path.join(filename + '.png'));

        try {
            await sleep(5000);
            const { stderr } = await execAsync(
                'rm ' + filename + '.svg ' + filename + '.png',
            );
            if (stderr) {
                console.error('Error:', stderr);
            }
            console.log('Delete finished');
        } catch (error) {
            console.error('Delete failed:', error);
        }
    },
);

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export default router;
