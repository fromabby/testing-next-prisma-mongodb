// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// DELETE ITEM -> /api/item/d/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const itemId = String(req.query.id)

    try {
        await prisma.item.delete({
            where: {
                id: itemId,
            },
        })

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({
            error: `Cannot delete item ${itemId}`,
        })
    }
}
