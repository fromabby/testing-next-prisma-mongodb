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

// GET ALL ITEMS -> /api/item
const handleGET = async (res: NextApiResponse) => {
    try {
        const items = await prisma.item.findMany()

        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: 'Cannot get all items' })
    }
}

// CREATE ITEM -> /api/item
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await prisma.item.create({
            data: { ...req.body },
        })

        res.status(200).json(id)
    } catch (error) {
        res.status(500).json({ error: 'Cant create new item' })
    }
}

export default handle
