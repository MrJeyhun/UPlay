import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";

export default validateRoute(async (res, req, user) => {
    const playlistsCount = await prisma.playlist.count({
        where: {
            userId: user.id
        }
    })
    res.json({...user, playlistsCount});
})