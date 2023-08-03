import Image from "next/image";
import React from "react";

interface DataType {
  Competition: {
    Name: string;
  };
  LocalTeam: {
    Name: string;
    Image: string;
  };
  AwayTeam: {
    Name: string;
    Image: string;
  };
  Date: string;
  Channels: Array<{
    Name: string;
    Image: string;
  }>;
}

interface CardProps {
  data: Array<DataType>;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="flex max-w-4xl shadow-lg border">
      <div className="w-3 bg-emerald-700" />
      <div className="p-5 flex-1">
        <p className="flex justify-end text-xs md:text-base">Manana 18:00</p>
        <h3 className="text-sm md:text-xl font-semibold italic">
          Fase regular
        </h3>
        <div className="flex gap-3 md:text-3xl font-bold mt-3">
          <div className="flex gap-2 items-center">
            <Image src="/barcelona.png" width={30} height={30} alt="icon" />
            <h1>Fase regular</h1>
          </div>
          <p>-</p>
          <div className="flex gap-2 items-center">
            <Image src="/barcelona.png" width={30} height={30} alt="icon" />
            <h1>Fase regular</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:items-end mt-3">
          <p>M+ Liga de Campeones 2 (M57-O116)</p>
          <p>M+ #Vamos Bar 2 (305)</p>
        </div>
        <div className="flex gap-2 md:justify-end mt-5">
          <Image src="/moviestar.png" width={80} height={45} alt="icon" />
          <Image src="/moviestar.png" width={80} height={45} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default Card;
