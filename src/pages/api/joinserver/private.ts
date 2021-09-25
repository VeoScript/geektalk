import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

interface JoinPrivateServer {
  date: Date
  serverName: String
  userId: String
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<JoinPrivateServer>) {
  const date = new Date()
  const serverName = req.body.serverName
  const userId = req.body.userId
  const joined_private_server = await prisma.joinedServer.create({
    data: {
      date: date,
      serverName: serverName,
      userId: userId
    }
  })
  res.status(200).json(joined_private_server)
}