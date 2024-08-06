import { PrismaClient, Status } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

function generateRandomTask() {
  return {
    title: faker.person.bio(),
    description: faker.word.words({ count: 5 }),
    status: faker.helpers.enumValue(Status),
  };
}

async function main() {
  const tasks = faker.helpers.multiple(generateRandomTask, {
    count: 100,
  });

  try {
    await prisma.task.createMany({
      data: tasks,
    });
  } catch (error) {
    console.log(error);
  }
}

main();
