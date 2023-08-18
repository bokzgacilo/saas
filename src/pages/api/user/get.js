import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  if(req.method == 'GET'){
    const prisma = new PrismaClient()

    const {id} = req.query;
  
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    
    if(user){
      res.status(200).json(user)
    }else {
      res.status(404).json({message: 'User not found'});
    }
  }else {
    res.status(405).json('Invalid Method Request!')
  }
}
