// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// UPDATE TICKET -> /api/ticket/u/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const ticketId = String(req.query.id)

    try {
        const ticket = await prisma.ticket.update({
            where: {
                id: ticketId,
            },
            data: { ...req.body },
        })

        res.status(200).json(ticket)
    } catch (error) {
        res.status(500).json({
            error: `Cannot update ticket ${ticketId}`,
        })
    }
}
