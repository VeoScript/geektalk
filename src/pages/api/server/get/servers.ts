import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const get_servers = await prisma.server.findMany({
      orderBy: [
        {
          date: 'desc'
        }
      ],
      select: {
        id: true,
        name: true,
        status: true,
        passcode: true,
        joined_servers: {
          select: {
            indicator: true,
            userId: true
          }
        }
      }
    })
    res.status(200).json(get_servers)
  }
}