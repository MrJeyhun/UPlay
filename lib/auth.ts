import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies.UPLAY_ACCESS_TOKEN
        console.log("token in here:" , token)

        if (token) {
            let user;

            try {
                const { id } = jwt.verify(token, 'hello');
                user = await prisma.user.findUnique({
                    where: { id },
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
        //TODO: if token doesn't exist route to auth page
        res.status(401);
        res.json({error: 'Not authorized'});
    }
}