// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET ALL TICKETS -> /api/ticket/
const handle = async (_: NextApiRequest, res: NextApiResponse) => {
    try {
        const tickets = await prisma.user.findMany()

        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).json({ error: 'Cannot get all tickets' })
    }
}

export default handle
