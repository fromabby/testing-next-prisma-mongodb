// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = await prisma.user.create({
        data: {
            nearId: 'abby',
            discord: { create: [{ username: 'Myoui', tag: '1234' }] },
        },
    })

    const result = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            discord: true,
        },
    })

    console.log(result)

    res.status(200).json(result)
}
