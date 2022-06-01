// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        handleGET(res)
    } else if (req.method === 'POST') {
        handlePOST(req, res)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// GET ALL USERS -> /api/user
const handleGET = async (res: NextApiResponse) => {
    try {
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Cannot get all users' })
    }
}

// CREATE USER -> /api/user
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default handle
