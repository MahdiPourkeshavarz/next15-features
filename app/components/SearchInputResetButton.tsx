import Link from "next/link";

function SearchInputResetButton() {
  function inputResetHandler() {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  }
  return (
    <>
      <button type="reset" onClick={inputResetHandler}>
        <Link href="/" className="search-btn text-white">
          X
        </Link>
      </button>
    </>
  );
}

export default SearchInputResetButton;
