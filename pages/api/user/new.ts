// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST new user -> /api/user/new
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { nearId, discord, tickets } = req.body
    const { username, tag } = discord

    try {
        const { id } = await prisma.user.create({
            data: {
                nearId,
                discord: {
                    set: {
                        username,
                        tag,
                    },
                },
                tickets: {
                    create: tickets, // where tickets = [..., {ticketName, ticketNumber}]
                },
            },
        })

        res.status(200).json(id)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Cant create new user' })
    }
}
