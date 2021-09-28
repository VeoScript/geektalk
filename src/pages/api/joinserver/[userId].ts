import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query 
  const joined_server = await prisma.joinedServer.findMany({
    where: {
      userId: String(userId)
    },
  })
  res.status(200).json(joined_server)
}