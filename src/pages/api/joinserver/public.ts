import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

interface JoinPublicServer {
  date: Date
  serverName: String
  userId: String
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<JoinPublicServer>) {
  const date = new Date()
  const serverName = req.body.serverName
  const userId = req.body.userId
  const joined_public_server = await prisma.joinedServer.create({
    data: {
      date: date,
      serverName: serverName,
      userId: userId
    }
  })
  res.status(200).json(joined_public_server)
}