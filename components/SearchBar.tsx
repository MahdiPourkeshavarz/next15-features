import Form from "next/form";
import SearchInputResetButton from "./SearchInputResetButton";
import { Search } from "lucide-react";

function SearchBar({ query }: { query: string }) {
  return (
    <>
      <Form action="/" scroll={false} className="search-form">
        <input
          type="text"
          defaultValue={query}
          className="search-input"
          placeholder="Search Startups"
        />
        <div className="flex gap-1">
          {query && <SearchInputResetButton />}
          <button type="submit" className="search-btn text-white">
            <Search className="size-5" />
          </button>
        </div>
      </Form>
    </>
  );
}

export default SearchBar;
