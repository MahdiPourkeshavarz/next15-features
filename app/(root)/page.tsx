import SearchBar from "../components/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="pink_container">
        <h2 className="heading">
          Pitch Your startup, <br /> connect with entrepreneurs
        </h2>

        <p className="sub-heading !max-w-3xl">
          submit ideas, vote on pitches, and get noticed in virtual competition
        </p>
        <SearchBar query={query as string} />
      </section>
    </>
  );
}
