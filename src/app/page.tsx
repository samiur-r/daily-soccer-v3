"use client"

import Card from "@/components/Card";
import useStore from "@/store";

export default function Home() {
  const counter = useStore((state) => state.count);
  console.log(counter)

  return (
    <main className="flex flex-col gap-5 min-h-screen m-3 md:ml-80">
      <Card />
    </main>
  );
}
