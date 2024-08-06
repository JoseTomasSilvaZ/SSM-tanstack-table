import { Prisma, PrismaClient } from "@prisma/client";
import TableComp from "./table";

const prisma = new PrismaClient();
export default async function Home() {
  const data = await prisma.task.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TableComp data={data} />
    </main>
  );
}
