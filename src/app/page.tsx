"use client";

import Card from "@/components/Card";
import useStore from "@/store";
import { MatchType } from "@/types/match";
import { useEffect, useState } from "react";

const fetchData = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const {
    currentPage,
    totalItems,
    matches,
    isLoading,
    fetchNextPage,
    setCurrentPage,
    setTotalItems,
    setMatches,
    revalidate,
  } = useStore();

  const [matchList, setMatchList] = useState<MatchType[]>([]);
  const [renderShowMoreBtn, setRenderShowMoreBtn] = useState(false);

  useEffect(() => {
    if (currentPage === 0)
      fetchData(`/api/matches?page=1`).then((res) => {
        setMatches(JSON.parse(res.data));
        setTotalItems(res.totalItems);
        setCurrentPage(1);
      });
  }, [currentPage]);

  useEffect(() => {
    setMatchList(matches);
  }, [matches]);

  useEffect(() => {
    if (matchList.length < totalItems) setRenderShowMoreBtn(true);
    else setRenderShowMoreBtn(false);
  }, [matchList]);

  useEffect(() => {
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_ENV === "development"
        ? `ws://localhost:3000`
        : `wss://${process.env.NEXT_PUBLIC_API_DOMAIN}`
    );

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "file_change") revalidate();
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <main className="flex flex-col gap-5 min-h-screen py-10 m-3 md:ml-80 max-w-5xl">
      {matchList.map((match: MatchType) => (
        <Card key={match.Id} data={match} />
      ))}
      {renderShowMoreBtn && (
        <button
          className="max-w-max mx-auto mt-5 flex gap-3 items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={fetchNextPage}
        >
          {isLoading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-5 h-5 mr-3 text-primary animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          Load More
        </button>
      )}
    </main>
  );
}
