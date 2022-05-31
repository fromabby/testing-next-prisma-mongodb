// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET ALL AVAILABLE ITEMS -> /api/item/available
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const items = await prisma.item.findMany({
            where: {
                isAvailable: true,
            },
        })

        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: 'Cannot get available items' })
    }
}
