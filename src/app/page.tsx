import MatchList from "@/components/MatchList";

const getMatches = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/matches?page=1`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const result = await res.json();
  return { matches: JSON.parse(result.data), totalItems: result.totalItems };
};

export default async function Home() {
  const { matches, totalItems } = await getMatches();

  return (
    <main className="flex flex-col gap-5 min-h-screen py-10 m-3 md:ml-80 max-w-5xl">
      <MatchList matches={matches} totalItems={totalItems} />
    </main>
  );
}
