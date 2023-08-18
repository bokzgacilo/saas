import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  if(req.method == 'POST'){
    const prisma = new PrismaClient()

    const checker = await prisma.user.findUnique({
      where: {
        email: req.body.email
      },
    });

    if(!checker){
      const newUser = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
        },
      });

      if(newUser){
        res.status(200).json(newUser)
      }
    }else {
      res.status(400).json({message: 'Email already taken, try another email.'})
    }

  }else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
