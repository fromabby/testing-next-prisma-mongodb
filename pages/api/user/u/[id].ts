// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// UPDATE USER -> /api/user/u/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userId = String(req.query.id)

    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: { ...req.body },
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: `Cannot update user ${userId}`,
        })
    }
}
