// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET SINGLE ITEM -> /api/item/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const itemId = String(req.query.id)

    try {
        const item = await prisma.item.findUnique({
            where: {
                id: itemId,
            },
        })

        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({
            error: `Cannot get item ${itemId}`,
        })
    }
}
