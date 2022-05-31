// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET ALL USERS -> /api/user
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Cannot get all users' })
    }
}
