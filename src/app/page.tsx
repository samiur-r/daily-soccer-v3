"use client";

import Card from "@/components/Card";
import useStore from "@/store";

export default function Home() {
  const currentPage = useStore((state) => state.currentPage);
  const data = useStore((state) => state.data);
  const fetchNextPage = useStore((state) => state.fetchNextPage);

  return (
    <main className="flex flex-col gap-5 min-h-screen m-3 md:ml-80">
      <Card data={data} />
    </main>
  );
}
