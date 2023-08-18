import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  if(req.method == 'PATCH'){
    const prisma = new PrismaClient()

    const updateUser = await prisma.user.update({
      where: { email: req.body.email},
      data: {
        name: req.body.name,
      },
    });

    if(updateUser){
      res.status(200).json(updateUser)
    }else {
      res.status(400).json({message: 'Problem updating user information'})
    }
  }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
