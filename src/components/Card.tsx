import React from "react";
import Image from "next/image";

import { MatchType } from "@/types/match";
import formatDate from "@/utils/formatDate";

interface CardProps {
  data: MatchType;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="flex shadow-lg border bg-white mb-2" itemScope itemType="http://schema.org/SportsEvent">
      <div className="p-5 flex-1">
        <time className="flex justify-end text-xs md:text-base"
          suppressHydrationWarning
          itemProp="startDate"
          dateTime={data.Date}
        >
          {formatDate(data.Date)}
        </time>
        <h3 className="text-sm md:text-xl font-semibold italic" itemProp="name">
          {data.Competition.Name}
        </h3>
        <div className="flex gap-3 md:text-3xl font-bold mt-3">
          <div className="flex gap-2 items-center">
            {/* <Image src="/barcelona.png" width={30} height={30} alt="icon" /> */}
            <h2 className="uppercase font-normal" itemProp="homeTeam">{data.LocalTeam.Name}</h2>
          </div>
          <p>-</p>
          <div className="flex gap-2 items-center">
            {/* <Image src="/barcelona.png" width={30} height={30} alt="icon" /> */}
            <h2 className="uppercase font-normal" itemProp="awayTeam">{data.AwayTeam.Name}</h2>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-end mt-3">
          {data.Channels &&
            data.Channels.length &&
            data.Channels.map((channel) => (
              <Image
                key={channel.Id}
                src={`/img/${channel.Image}`}
                width={32}
                height={32}
                alt={channel.Name}
                title={channel.Name}
                itemProp={channel.Name} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
