// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import prisma from '../../../../../../lib/prisma'
import axios from 'axios'
import next from 'next'

// * (get random item -> check availability) -> (update item availability -> update user details -> update ticket details (minted)) -> display

// RANDOMIZER -> /api/randomize/:item/:user/:ticket
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const itemId = String(req.query.item)
    const userId = String(req.query.user)
    const ticketId = String(req.query.ticket)

    try {
        // * (get random item -> check availability of ticket and item)
        const item = await prisma.item.findUnique({
            where: {
                id: itemId,
            },
        })

        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId,
            },
        })

        if (!item?.isAvailable || ticket?.isMinted)
            return res.status(500).json({
                error: `item ${itemId} or ticket ${ticketId} are not available`,
            })

        // * (update item availability -> update ticket details (minted))
        await prisma.item.update({
            where: {
                id: itemId,
            },
            data: {
                isAvailable: !item?.isAvailable,
                mintDate: new Date(Date.now()),
                userId,
            },
        })

        await prisma.ticket.update({
            where: {
                id: ticketId,
            },
            data: {
                isMinted: !ticket?.isMinted,
                mintDate: new Date(Date.now()),
                userId,
            },
        })

        // * display user details

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                tickets: true,
                items: true,
            },
        })

        res.status(200).json({
            user,
            item,
            ticket,
        })
    } catch (error) {
        res.status(500).json({ error: 'Cannot get all users' })
    }
}
