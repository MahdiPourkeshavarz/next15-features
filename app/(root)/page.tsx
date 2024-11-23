import SearchBar from "@/components/SearchBar";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/query";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);

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
      <section className="section_container">
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={index} post={post} />
            ))
          ) : (
            <>
              <p>No Startup found</p>
            </>
          )}
        </ul>
      </section>
    </>
  );
}
