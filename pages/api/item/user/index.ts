// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// GET ALL USERS WITH TICKETS -> /api/ticket/user/
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const tickets = await prisma.user.findMany({
            where: {
                NOT: {
                    // user has no tickets
                    tickets: {
                        none: {}, // that are none
                    },
                },
            },
        })

        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).json({ error: 'Cannot get all users with tickets' })
    }
}
