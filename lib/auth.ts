import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const { UPLAY_ACCESS_TOKEN: token } = req.cookies;

        if (token) {
            let user;

            try {
                const {id} = jwt.verify(token, 'Hello');
                user = await prisma.user.findUnique({
                    where: {id},
                })

                if (!user) {
                    throw new Error('Not real user');
                }
            } catch (error) {
                res.status(401);
                res.json({error: 'Not authorized'});
                return;
            }

            return handler(req, res, user);
        }
        
        res.status(401);
        res.json({error: 'Not authorized'});
    }
}