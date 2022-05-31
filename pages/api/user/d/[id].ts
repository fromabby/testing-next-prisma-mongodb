// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// DELETE USER -> /api/user/d/:id
export default async function deleteUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userId = String(req.query.id)

    try {
        await prisma.user.delete({
            where: {
                id: userId,
            },
        })

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({
            error: `Cannot delete user ${userId}`,
        })
    }
}
