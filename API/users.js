const prisma = require(`../prisma`)
const express = require(`express`)
const router = express.Router()
module.exports = router

router.get(`/`, async (req, res, next) => {
  try{
    const users = await prisma.user.findMany();
    res.json(users);
  }catch(e){
    next(e);
  }
});

router.get( `/:id`, async (req, res, next) => {
  const { id } = req.params;
  try{
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: +id },
      include: {playlists: true},
    });
    if (!user){
      next({status: 404})
    }
    res.json(user);
  }catch(e){
    next(e);
  }
})

router.post(`/:id/playlists`, async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name){
    next({status: 400, message: `Please enter a name ("name": String)`})
  }
  if (!description){
    next({status: 400, message: `Please enter a description ("description": String)`})
  }
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: +id},
      include: { playlists: true},
    })
    if (!user){
      next({status: 404})
    }

    const newPlaylist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: +id,
      }
    })
    res.json(newPlaylist);
  }catch(e){
    next(e)
  }

})