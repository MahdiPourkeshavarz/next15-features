import SearchBar from "@/components/SearchBar";
import StartupCard from "@/components/StartupCard";
import { StartupCardType } from "@/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: "Yesterday",
      views: 55,
      author: { _id: 1, name: "mahdi" },
      _id: 1,
      description: "this is description",
      image:
        "https://th.bing.com/th/id/R.738fc63dc62d7705526d9dd32a40ed4b?rik=hhu7M%2fxfml%2fMSA&pid=ImgRaw&r=0",
      category: "Robots",
      title: "We Robots",
    },
    {
      _createdAt: "Tuesday",
      views: 65,
      author: { _id: 1, name: "ali" },
      _id: 2,
      description: "this is description",
      image:
        "https://th.bing.com/th/id/R.738fc63dc62d7705526d9dd32a40ed4b?rik=hhu7M%2fxfml%2fMSA&pid=ImgRaw&r=0",
      category: "Robots2",
      title: "We Robots2",
    },
  ];

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
