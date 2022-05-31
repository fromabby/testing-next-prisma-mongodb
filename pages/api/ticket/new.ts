// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST new ticket -> /api/ticket/new
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { id } = await prisma.ticket.create({
            data: { ...req.body },
        })

        res.status(200).json(id)
    } catch (error) {
        res.status(500).json({ error: 'Cant create new ticket' })
    }
}
