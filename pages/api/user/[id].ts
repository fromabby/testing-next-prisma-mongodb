// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = String(req.query.id)

    if (req.method === 'GET') {
        handleGET(userId, res)
    } else if (req.method === 'DELETE') {
        handleDELETE(userId, res)
    } else if (req.method === 'UPDATE') {
        handleUPDATE(userId, req, res)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// GET USER -> /api/user/:id
const handleGET = async (userId: string, res: NextApiResponse) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                tickets: true,
            },
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: `Cannot get user ${userId}`,
        })
    }
}

// DELETE USER -> /api/user/:id
const handleDELETE = async (userId: string, res: NextApiResponse) => {
    try {
        await prisma.user.delete({
            where: {
                id: userId,
            },
        })

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({
            error: `Cannot delete user ${userId}`,
        })
    }
}

// UPDATE USER -> /api/user/:id
const handleUPDATE = async (
    userId: string,
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: { ...req.body },
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: `Cannot update user ${userId}`,
        })
    }
}

export default handle
