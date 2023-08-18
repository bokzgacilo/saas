import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  if(req.method == 'DELETE'){
    const prisma = new PrismaClient()

    const deleteUser = await prisma.user.delete({
      where: { email: req.body.email },
    })

    if(deleteUser){
      res.status(200).json(deleteUser)
    }else {
      res.status(400).json({message: 'Problem deleting information'})
    }
  }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
