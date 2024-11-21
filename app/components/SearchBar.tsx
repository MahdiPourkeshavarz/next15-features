import Form from "next/form";
import SearchInputResetButton from "./SearchInputResetButton";

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
        <div>
          {true && <SearchInputResetButton />}
          <button type="submit" className="search-btn text-white">
            Search
          </button>
        </div>
      </Form>
    </>
  );
}

export default SearchBar;
