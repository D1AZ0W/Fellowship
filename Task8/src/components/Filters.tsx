import { useState } from "react";

type FilterProps = {
  handleSearch: (query: string, userId?: number) => void;
};

export const Filters = ({ handleSearch }: FilterProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <div className="flex flex-wrap gap-5 text-sm">
      <input
        type="text"
        placeholder="Search posts"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          handleSearch(value, filter ? Number(filter) : undefined);
        }}
        className="rounded p-3 border"
      />

      <select
        value={filter}
        onChange={(e) => {
          const value = e.target.value;
          setFilter(value);
          handleSearch(search, value ? Number(value) : undefined);
        }}
        className="rounded border p-3 "
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
