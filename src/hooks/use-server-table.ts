"use client";

import { Input } from "@/components/ui/input";
import { TableOptions } from "@tanstack/react-table";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { z } from "zod";

const searchParamsSchema = z.object({
  page: z.coerce.number().optional(),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
});

export function useDataTable<TData>({}: TableOptions<TData>) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  let { page, per_page, sort } = searchParamsSchema.parse(searchParams);

  per_page = per_page ?? 10;
}
