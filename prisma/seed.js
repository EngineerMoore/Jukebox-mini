const prisma = require(`../prisma`);
const { faker } = require(`@faker-js/faker`);

const seed = async () => {
/* Cannot use createMany() within a createMany() due to prisma limitations.
Example: cannot do ....users.createMany({ data: ...playlists.createMany() })*/
const numUsers = 3
for (let i = 0; i < numUsers; i++){
  const playlists = [];
  for (let j = 0; j < 5; j++){
    playlists.push({
      name: faker.music.genre(),
      description: faker.lorem.paragraph(2),
    })
  }

  await prisma.user.create({
    data: {
      username: faker.internet.username(),
      playlists: {
        create: playlists,
      },
    },
  })
};
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })