// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = await prisma.discord.create({
        data: {
            username: 'Myoui',
            tag: '1234',
            user: { create: { nearId: 'abby' } },
        },
    })

    const result = await prisma.discord.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
        },
    })

    console.log(result)
    res.status(200).json(result)
}
