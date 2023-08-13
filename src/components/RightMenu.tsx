"use client";

import React from "react";
// import useStore from "@/store";

interface RightMenuProps {
  competitionName?: string;
}

const RightMenu: React.FC<RightMenuProps> = ({ competitionName }) => {
  //   const rightMenuContent = useStore((state) => state.rightMenuContent);

  return (
    <aside className="hidden xl:block sticky top-24">
      <div className="space-y-4 border-l-4 border-emerald-700 ps-4">
        <h1 className="font-medium">
          {competitionName
            ? competitionName
            : "¿Dónde lo dan? Encuentra Dónde Verlo: Próximos Partidos de Fútbol en Canales y Plataformas de Streaming."}
        </h1>
        <a href="https://x.com/dondelodantv" target="_blank" rel="noreferrer">
          Twitter
        </a>
        <p>Contacto: hola@dondelodan.com</p>
        <p>©2023 dondelodan.com</p>
      </div>
    </aside>
  );
};

export default RightMenu;
