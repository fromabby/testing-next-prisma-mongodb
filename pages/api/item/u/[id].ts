// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// UPDATE ITEM -> /api/item/u/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const itemId = String(req.query.id)

    try {
        const item = await prisma.item.update({
            where: {
                id: itemId,
            },
            data: { ...req.body },
        })

        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({
            error: `Cannot update item ${itemId}`,
        })
    }
}
