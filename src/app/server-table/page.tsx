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

const Page = async ({ searchParams }: any) => {
  const { page, per_page, title } = searchParams;
  const { tasks: data, pageCount } = await getTasks({ page, per_page, title });
  console.log({ data }, "DATA ON SP");
  return <Glue data={data} pageCount={pageCount} />;
};

export default Page;
