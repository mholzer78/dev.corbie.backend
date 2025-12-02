import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

type Options = [number, number | string | undefined, string | undefined];

export default router.get(
    ['/'],
    (req: Request, res: Response, next: NextFunction) => {
        res.sendFile(path.join(__dirname, '..', '..', 'views', 'home.html'));
    }
);
