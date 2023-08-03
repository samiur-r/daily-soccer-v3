"use client";

import Card from "@/components/Card";
import useStore from "@/store";

export default function Home() {
  const currentPage = useStore((state) => state.currentPage);
  console.log(currentPage);

  return (
    <main className="flex flex-col gap-5 min-h-screen m-3 md:ml-80">
      <Card />
    </main>
  );
}
