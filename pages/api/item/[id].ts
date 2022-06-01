// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const itemId = String(req.query.id)

    if (req.method === 'GET') {
        handleGET(itemId, res)
    } else if (req.method === 'DELETE') {
        handleDELETE(itemId, res)
    } else if (req.method === 'UPDATE') {
        handleUPDATE(itemId, req, res)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

// GET ITEM -> /api/item/:id
const handleGET = async (itemId: string, res: NextApiResponse) => {
    try {
        const item = await prisma.item.findUnique({
            where: {
                id: itemId,
            },
        })

        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({
            error: `Cannot get item ${itemId}`,
        })
    }
}

// DELETE ITEM -> /api/item/:id
const handleDELETE = async (itemId: string, res: NextApiResponse) => {
    try {
        await prisma.item.delete({
            where: {
                id: itemId,
            },
        })

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({
            error: `Cannot delete item ${itemId}`,
        })
    }
}

// UPDATE ITEM -> /api/item/:id
const handleUPDATE = async (
    itemId: string,
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const item = await prisma.item.update({
            where: {
                id: itemId,
            },
            data: { ...req.body },
        })

        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({
            error: `Cannot update item ${itemId}`,
        })
    }
}

export default handle
