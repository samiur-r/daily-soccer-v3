"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Card from "./Card";
import { MatchType } from "@/types/match";
import { categorizeMatchesByDate } from "@/utils/matches";

interface MatchListProps {
  matches: MatchType[];
  categorizedMatches: any;
  competition_name?: string;
  totalItems: number;
  title?: string | null;
  titleImage?: string;
}

const MatchList: React.FC<MatchListProps> = ({
  matches,
  categorizedMatches,
  competition_name,
  totalItems,
  title,
  titleImage,
}) => {
  const [matchList, setMatchList] = useState(matches);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [categorizedMatchList, setCategorizedMatchList] =
    useState<any>(categorizedMatches);

  useEffect(() => {
    if (!isFirstRender)
      setCategorizedMatchList(
        Object.entries(categorizeMatchesByDate(matchList))
      );
    setIsFirstRender(false);
  }, [matchList]);

  const fetchNextPage = async () => {
    setIsLoading(true);
    try {
      const url = competition_name
        ? `${
            process.env.NEXT_PUBLIC_DOMAIN
          }/api/competition?competition_name=competition_name&page=${
            currentPage + 1
          }`
        : `${process.env.NEXT_PUBLIC_DOMAIN}/api/matches?page=${
            currentPage + 1
          }`;
      const res = await fetch(url);
      const result = await res.json();
      setMatchList((prevMatches) => [...prevMatches, ...result.matches]);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 w-full max-w-5xl">
      <div className="flex gap-5 items-center">
        {titleImage && (
          <Image
            src={`/img/${titleImage}`}
            alt="competition_name"
            width={70}
            height={70}
          />
        )}
        <h1 className="text-2xl lg:text-4xl font-bold">
          {title ? "Partidos de " + title : "Todos los partidos de fútbol"}
        </h1>
      </div>

      {categorizedMatchList &&
        categorizedMatchList.map((data: any) => (
          <div key={data[0]}>
            <p className="text-md font-normal mb-2 mt-6">{data[0]}</p>
            {data[1].map((match: MatchType) => (
              <Card key={match.Id} data={match} />
            ))}
          </div>
        ))}

      {matchList.length < totalItems && (
        <button
          className="w-full md:max-w-max w-100 mx-auto mt-5 flex gap-3 text-2xl justify-center items-center bg-emerald-800 hover:bg-emerald-700 text-white font-regular hover:text-white py-2 px-4 border border-emerald-800 hover:border-transparent rounded"
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
          Ver más partidos
        </button>
      )}
    </div>
  );
};

export default MatchList;
