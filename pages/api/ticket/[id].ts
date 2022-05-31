// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET SINGLE TICKET -> /api/ticket/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const ticketId = String(req.query.id)

    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId,
            },
        })

        res.status(200).json(ticket)
    } catch (error) {
        res.status(500).json({
            error: `Cannot get ticket ${ticketId}`,
        })
    }
}
