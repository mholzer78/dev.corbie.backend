import express, { Request, Response, NextFunction } from 'express';

const authRouter = express.Router();
const usersRouter = express.Router();
const productsRouter = express.Router();

// ==========================================
// 1. Auth Routes
// ==========================================
interface LoginRequestBody {
    email: string;
    password?: string;
}

authRouter.post(
    '/login',
    (req: Request<{}, {}, LoginRequestBody>, res: Response): void => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                error: 'Bad Request',
                message: 'Email and password are required.',
            });
            return;
        }

        if (
            email === 'michael.hofer@example.at' &&
            password === 'secretpassword123'
        ) {
            res.status(200).json({
                success: true,
                tokenType: 'Bearer',
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                refreshToken: 'ref_88a91c32b001ef4a89a0',
                expiresIn: 3600,
                user: {
                    id: 'usr_9f8a12b4',
                    firstName: 'Michael',
                    lastName: 'Hofer',
                    email: 'michael.hofer@example.at',
                    role: 'DEVELOPER',
                },
            });
            return;
        }

        res.status(401).json({
            success: false,
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Invalid email address or password.',
        });
    },
);

// ==========================================
// 2. Users Routes
// ==========================================
interface PaginationQuery {
    page?: string;
    limit?: string;
    random?: string;
}

usersRouter.get(
    '/',
    (req: Request<{}, {}, {}, PaginationQuery>, res: Response): void => {
        const page = parseInt(req.query.page || '1', 10);
        const limit = parseInt(req.query.limit || '10', 10);
        const random = req.query.random === 'true';

        res.status(200).json({
            page,
            limit,
            total: 50,
            data: [
                {
                    id: 'usr_9f8a12b4',
                    firstName: 'Michael',
                    lastName: 'Hofer',
                    email: 'michael.hofer@example.at',
                    role: 'DEVELOPER',
                    avatar: 'https://corbie.dev/assets/avatars/user-1.svg',
                    status: 'ACTIVE',
                    address: {
                        street: 'Hauptstraße 14',
                        zipCode: '2361',
                        city: 'Laxenburg',
                        country: 'Austria',
                    },
                    company: 'Tech Solutions GmbH',
                    createdAt: '2024-01-15T08:30:00.000Z',
                },
            ],
        });
    },
);

usersRouter.get('/:id', (req: Request<{ id: string }>, res: Response): void => {
    const { id } = req.params;

    res.status(200).json({
        id,
        firstName: 'Michael',
        lastName: 'Hofer',
        email: 'michael.hofer@example.at',
        role: 'DEVELOPER',
    });
});

// ==========================================
// 3. Products Routes
// ==========================================
productsRouter.get('/', (req: Request, res: Response): void => {
    res.status(200).json({
        page: 1,
        limit: 10,
        total: 120,
        data: [
            {
                id: 'prd_101',
                title: 'Ergonomic Mechanical Keyboard',
                price: 149.99,
                currency: 'EUR',
                category: 'Electronics',
                isAvailable: true,
            },
        ],
    });
});

export { authRouter, usersRouter, productsRouter };
