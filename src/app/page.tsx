import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { getTasks } from "./actions";
import TasksTable from "./tasks-table";
// import TasksTable from "./_components2/tasks-table";

const searchParamsSchema = z.object({
  page: z.coerce.number().optional(),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
  title: z.string().optional(),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, per_page, sort, title } =
    searchParamsSchema.parse(searchParams);
  const { tasks: data, pageCount } = await getTasks({
    page,
    per_page,
    title,
    sort,
  });
  return (
    <main className="flex items-center justify-center min-h-dvh">
      <section className="max-w-5xl w-full p-10">
        <TasksTable data={data} pageCount={pageCount} />
      </section>
    </main>
  );
}
