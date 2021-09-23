import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

interface Server {
  name: String
  date: Date
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Server>) {
  const server_name = req.body.server_name
  const date = new Date()
  const create_server = await prisma.server.create({
    data: {
      name: server_name,
      date: date
    }
  })
  res.status(200).json(create_server)
}