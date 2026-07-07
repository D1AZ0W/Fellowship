import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type FilterProps = {
  handleSearch: (query: string, userId?: number) => void;
};

export const Filters = ({ handleSearch }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [filter, setFilter] = useState(searchParams.get("filter") ?? "");
  const newParams = new URLSearchParams(searchParams);

  useEffect(() => {
    if (search === "" && filter === "") {
      newParams.delete("search");
      newParams.delete("filter");
      setSearchParams(newParams);
      handleSearch("", 1);
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch(search, filter ? Number(filter) : undefined);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search, filter, handleSearch, newParams, setSearchParams]);

  return (
    <div className="flex flex-wrap gap-5 text-sm">
      <input
        type="text"
        placeholder="Search posts"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          if (value !== "") {
            newParams.set("search", value);
            newParams.delete("page");
          } else {
            newParams.delete("search");
          }
          setSearchParams(newParams);
        }}
        className="rounded border p-3"
      />

      <select
        value={filter}
        onChange={(e) => {
          const value = e.target.value;
          setFilter(value);
          if (value !== "") {
            newParams.set("filter", value);
            newParams.delete("page");
          } else {
            newParams.delete("filter");
          }
          setSearchParams(newParams);
        }}
        className="rounded border p-3"
      >
        <option value="">All Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="4">User 4</option>
        <option value="5">User 5</option>
        <option value="6">User 6</option>
        <option value="7">User 7</option>
        <option value="8">User 8</option>
        <option value="9">User 9</option>
        <option value="10">User 10</option>
      </select>
    </div>
  );
};
