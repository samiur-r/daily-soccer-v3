import Card from "@/components/Card";
import useStore from "@/store";
import { StoreInitializer } from "@/components/StoreInitializer";

const fetchData = (url: string) => fetch(url).then((res) => res.json());

export default async function Home() {
  const currentPage = useStore.getState().currentPage;
  const cachedData = useStore.getState().data;
  const fetchNextPage = useStore.getState().fetchNextPage;

  let data = [];

  if (currentPage === 0)
    data = await fetchData(
      `http://localhost:3000/api/data?page=${currentPage + 1}`
    );

  return (
    <main className="flex flex-col gap-5 min-h-screen m-3 md:ml-80">
      <StoreInitializer data={data} currentPage={1} />
      <Card data={cachedData} />
    </main>
  );
}
