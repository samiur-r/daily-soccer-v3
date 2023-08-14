"use client";

import React from "react";

interface RightMenuProps {
  headline?: string | null;
}

const RightMenu: React.FC<RightMenuProps> = ({ headline }) => {
  return (
    <aside className="sticky top-24 space-y-4 border-l-4 border-emerald-700 ps-4">
      <h1 className="font-medium">
        {headline
          ? headline
          : "¿Dónde lo dan? Encuentra Dónde Verlo: Próximos Partidos de Fútbol en Canales y Plataformas de Streaming."}
      </h1>
      <a href="https://x.com/dondelodantv" target="_blank" rel="noreferrer">
        Twitter
      </a>
      <p>Contacto: hola@dondelodan.com</p>
      <p>©2023 dondelodan.com</p>
    </aside>
  );
};

export default RightMenu;
