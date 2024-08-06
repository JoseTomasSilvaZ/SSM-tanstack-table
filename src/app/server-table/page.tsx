import {
  TableBody,
  Table as TableC,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { flexRender, Table, TableOptions } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../_components/data-table";
import Glue from "./glue";
import { getTasks } from "../actions";
import { searchParamsSchema } from "../_components/use-data-table";
import { z } from "zod";

const sps = z.object({
  title: z.string().optional(),
  page: z.coerce.number().optional(),
  per_page: z.coerce.number().optional(),
});

const Page = async ({ searchParams }: any) => {
  const { title } = searchParams;
  const { page, per_page } = sps.parse(searchParams);
  const { tasks: data, pageCount } = await getTasks({ page, per_page, title });
  console.log({ data }, "DATA ON SP");
  return (
    <div className="p-16">
      <Glue data={data} pageCount={pageCount} />
    </div>
  );
};

export default Page;
