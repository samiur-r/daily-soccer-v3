import React from "react";
import Image from "next/image";

import { MatchType } from "@/types/match";
import formatDate from "@/utils/formatDate";

interface CardProps {
  data: MatchType;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="flex shadow border bg-white mb-3">
      <div className="p-5 flex-1">
        <time className="flex justify-end text-xs md:text-base"
          suppressHydrationWarning
          dateTime={data.Date}
        >
          {formatDate(data.Date)}
        </time>
        <h3 className="text-sm md:text-xl font-semibold italic">
          {data.Competition.Name}
        </h3>
        <div className="flex gap-3 text-2xl md:text-3xl font-bold mt-3">
          <div className="flex gap-2 items-center">
            {/* <Image src="/barcelona.png" width={30} height={30} alt="icon" /> */}
            <h2 className="uppercase font-normal">{data.LocalTeam.Name}</h2>
          </div>
          <p>-</p>
          <div className="flex gap-2 items-center">
            {/* <Image src="/barcelona.png" width={30} height={30} alt="icon" /> */}
            <h2 className="uppercase font-normal">{data.AwayTeam.Name}</h2>
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
              />
            ))}
        </div>
      </div>

      <div itemScope itemType="https://schema.org/SportsEvent">
        <meta itemProp="name" content={`${data.LocalTeam.Name} - ${data.AwayTeam.Name}`} />
        <meta itemProp="description" content={`Partido de fútbol entre ${data.LocalTeam.Name} - ${data.AwayTeam.Name} - ${formatDate(data.Date)} por ${data.Competition.Name}`} />
        <meta itemProp="url" content="https://www.dondelodan.com/" />
        <meta itemProp="startDate" content={data.Date} />
        <meta itemProp="duration" content="PT1H30M" />
        <meta itemProp="organizer" content={data.Competition.Name} />
        <div itemProp="homeTeam" itemScope itemType="https://schema.org/SportsTeam">
          <meta itemProp="name" content={data.LocalTeam.Name} />
        </div>
        <div itemProp="awayTeam" itemScope itemType="https://schema.org/SportsTeam">
          <meta itemProp="name" content={data.AwayTeam.Name} />
        </div>
        {data.Channels &&
          data.Channels.length &&
          data.Channels.map((channel) => (
            <div itemProp="location" itemScope itemType="https://schema.org/Place" key={channel.Id}>
              <p>{channel.Name}</p> <meta itemProp="name" content={channel.Name} />
            </div>
          ))}
      </div>
    </div >
  );
};

export default Card;
