// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// GET ALL USERS WITH TICKETS -> /api/ticket/user/
const handle = async (_: NextApiRequest, res: NextApiResponse) => {
    try {
        let tickets = await prisma.user.findMany({
            include: {
                tickets: {
                    where: {
                        isMinted: false,
                    },
                },
            },
        })

        const users = tickets.filter((user) => user.tickets.length !== 0)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Cannot get all users with tickets' })
    }
}

export default handle
