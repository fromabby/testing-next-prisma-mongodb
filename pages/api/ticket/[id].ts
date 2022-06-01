// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const ticketId = String(req.query.id)

    if (req.method === 'GET') {
        handleGET(ticketId, res)
    } else if (req.method === 'DELETE') {
        handleDELETE(ticketId, res)
    } else if (req.method === 'UPDATE') {
        handleUPDATE(ticketId, req, res)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// GET USER -> /api/user/:id
const handleGET = async (ticketId: string, res: NextApiResponse) => {
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

// DELETE USER -> /api/user/:id
const handleDELETE = async (ticketId: string, res: NextApiResponse) => {
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

// UPDATE USER -> /api/user/:id
const handleUPDATE = async (
    ticketId: string,
    req: NextApiRequest,
    res: NextApiResponse
) => {
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

export default handle
