// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET SINGLE USER -> /api/user/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userId = String(req.query.id)

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                tickets: true,
            },
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: `Cannot get user ${userId}`,
        })
    }
}
