import { useEffect, useState } from "react";
import { useCategory } from "#/hooks/useCategory";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SearchIcon } from "lucide-react";

type FiltersProps = {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export const Filters = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: FiltersProps) => {
  const { categories } = useCategory();
  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearchChange]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          className="pl-10"
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full md:w-56">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>

          {categories?.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
