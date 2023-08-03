"use client";
import Card from "@/components/Card";
import useStore from "@/store";
import { useEffect, useState } from "react";

const fetchData = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { currentPage, data, fetchNextPage, setCurrentPage, setData } =
    useStore();

  useEffect(() => {
    if (currentPage === 0)
      fetchData(`/api/data?page=1`).then((data) => {
        setData(data);
        setCurrentPage(1);
      });
  }, [currentPage]);

  return (
    <main className="flex flex-col gap-5 min-h-screen m-3 md:ml-80">
      <Card data={data} />
    </main>
  );
}
