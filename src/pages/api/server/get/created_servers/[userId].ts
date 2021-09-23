import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const { userId } = req.query  
    const user_created_servers = await prisma.server.findMany({
      orderBy: [
        {
          date: 'desc'
        }
      ],
      where: {
        userId: String(userId)
      },
      select: {
        id: true,
        name: true
      }
    })
    res.status(200).json(user_created_servers)
  }
}