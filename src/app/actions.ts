"use server";

import prisma from "@/lib/db";

export const getTasks = async ({
  page = 1,
  per_page = 10,
  title,
  sort,
}: any) => {
  const _sort = sort?.split(":") ?? ["id", "asc"];
  console.log({ sort });
  const [tasks, count] = await Promise.all([
    await prisma.task.findMany({
      skip: (+page - 1) * +per_page,
      take: +per_page,
      where: {
        title: {
          contains: title ?? "",
        },
      },
      orderBy: {
        [_sort[0]]: _sort[1],
      },
    }),
    prisma.task.count(),
  ]);

  const pageCount = Math.ceil(count / +per_page);
  return { tasks, pageCount };
};
