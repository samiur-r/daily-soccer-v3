import React from "react";
import Image from "next/image";

import { MatchType } from "@/types/match";
import formatDate from "@/utils/formatDate";

interface CardProps {
  data: MatchType;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="flex shadow-lg border">
      <div className="w-3 bg-emerald-700" />
      <div className="p-5 flex-1">
        <p className="flex justify-end text-xs md:text-base" suppressHydrationWarning>
          {formatDate(data.Date)}
        </p>
        <h3 className="text-sm md:text-xl font-semibold italic">
          {data.Competition.Name}
        </h3>
        <div className="flex gap-3 md:text-3xl font-bold mt-3">
          <div className="flex gap-2 items-center">
            <Image src="/barcelona.png" width={30} height={30} alt="icon" />
            <h1>{data.LocalTeam.Name}</h1>
          </div>
          <p>-</p>
          <div className="flex gap-2 items-center">
            <Image src="/barcelona.png" width={30} height={30} alt="icon" />
            <h1>{data.AwayTeam.Name}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:items-end mt-3">
          {data.Channels &&
            data.Channels.length &&
            data.Channels.map((channel) => (
              <p key={channel.Id}>{channel.Name}</p>
            ))}
        </div>
        <div className="flex gap-2 md:justify-end mt-5">
          <Image src="/moviestar.png" width={80} height={45} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default Card;
