import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

interface Server {
  name: String
  date: Date
  status: String
  passcode?: any
  userId: String
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Server>) {
  const server_name = req.body.server_name
  const server_status = req.body.server_status
  const server_passcode = req.body.server_passcode
  const user_id = req.body.user_id
  const date = new Date()
  const create_server = await prisma.server.create({
    data: {
      name: server_name,
      date: date,
      status: server_status,
      passcode: server_passcode,
      userId: user_id
    }
  })
  res.status(200).json(create_server)
}