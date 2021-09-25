import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(res: NextApiResponse) {
  const joined_server = await prisma.joinedServer.findMany()
  res.status(200).json(joined_server)
}