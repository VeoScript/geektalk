import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        phone: true,
        email: true,
        username: true,
        password: true
      }
    })
    res.status(200).json(users)
  }
}
