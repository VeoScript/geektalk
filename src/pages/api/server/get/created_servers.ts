import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'
import { Session } from 'next-iron-session'
type NextIronRequest = NextApiRequest & { session: Session }

export default async function handler(req: NextIronRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const user = req.session.get('user')
    const user_created_servers = await prisma.server.findMany({
      orderBy: [
        {
          date: 'desc'
        }
      ],
      where: {
        userId: user.id
      },
      select: {
        id: true,
        name: true
      }
    })
    res.status(200).json(user_created_servers)
  }
}