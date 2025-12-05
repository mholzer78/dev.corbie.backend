import path from 'path';
import express,{ Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

import homeRoutes from './routes/home.js';
import loremImageRoutes from './routes/loremImage.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/lorem-image', loremImageRoutes);
app.use('/', homeRoutes);

app.use((req:Request, res: Response, next:NextFunction) => {
    res.status(404).redirect('https://api.corbie.dev/404');
});

app.listen(3000);
