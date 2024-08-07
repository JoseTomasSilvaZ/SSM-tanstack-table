import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export function TableSearch({
  searchKey = "search",
  placeholder = "Please provide a placeholder",
}: {
  searchKey?: string;
  placeholder?: string;
}) {
  if (!searchKey.length) {
    searchKey = "search";
  }
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const onSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === null || value === "") {
      params.delete(searchKey);
    } else {
      params.set(searchKey, value);
    }

    router.push(`${path}/?${params.toString()}`);
  }, 300);

  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      className="h-8 w-36 lg:w-64"
    />
  );
}
