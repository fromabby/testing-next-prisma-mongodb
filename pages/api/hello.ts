// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = await prisma.user.create({
        data: {
            nearId: 'IHaveATicket',
            discord: {
                username: 'Unique12',
                tag: '1234',
            },
            tickets: {
                create: {
                    ticketName: 'Mystery Ticket',
                    ticketNumber: 1,
                },
            },
        },
    })

    const result = await prisma.user.findUnique({
        where: {
            id,
        },
    })

    console.log(result)
    res.status(200).json(result)
}
