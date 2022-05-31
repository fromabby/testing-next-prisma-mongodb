// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// GET AVAILABLE TICKETS OF USER -> /api/tickets/user/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userId = String(req.query.id)

    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                AND: [{ userId }, { isMinted: false }],
            },
        })

        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).json({
            error: `Cannot get available tickets of user ${userId}`,
        })
    }
}
