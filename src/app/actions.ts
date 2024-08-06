"use server";

import prisma from "@/lib/db";

export const getTasks = async ({ page, per_page, title }: any) => {
  console.log("Page:", page);
  console.log("Per Page:", per_page);
  console.log("Title:", title);
  const tasks = await prisma.task.findMany({
    skip: (+page - 1) * +per_page,
    take: +per_page,
    where: {
      title: {
        contains: title ?? "",
      },
    },
  });

  const count = await prisma.task.count();
  const pageCount = Math.ceil(count / +per_page);
  console.log(title, tasks.length);
  return { tasks, pageCount };
};
