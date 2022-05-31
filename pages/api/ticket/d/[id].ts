// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// DELETE TICKET -> /api/ticket/d/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const ticketId = String(req.query.id)

    try {
        await prisma.ticket.delete({
            where: {
                id: ticketId,
            },
        })

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({
            error: `Cannot delete ticket ${ticketId}`,
        })
    }
}
