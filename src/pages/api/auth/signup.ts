import type { NextApiRequest, NextApiResponse } from 'next'
// import bcrypt from 'bcryptjs'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    name,
    username,
    phone,
    email,
    password
  } = req.body

  // const salt = await bcrypt.genSalt()
  // const password = await bcrypt.hash(rawPassword, salt)

  const signup = await prisma.user.create({
    data: {
      name: name,
      username: username,
      phone: phone,
      email: email,
      password: password
    }
  })
  res.json(signup)
}
