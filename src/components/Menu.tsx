"use client";

import { usePathname } from "next/navigation";

import { CompetitionType } from "@/types/competition";
import { useEffect, useState } from "react";
import Link from "next/link";

interface MenuProps {
  competitions: CompetitionType[];
}

const Menu: React.FC<MenuProps> = ({ competitions }) => {
  const pathname = usePathname();
  const [active, setActive] = useState<number | undefined>();

  const getActiveCompetition = (currentUtl: string) => {
    const foundCompetition = competitions.find(
      (obj) => obj.Name === currentUtl
    );
    return foundCompetition || null;
  };

  useEffect(() => {
    if (pathname === "/") {
      setActive(-1);
      return;
    }

    const parts = pathname.split("campeonato/");
    const competitionName = parts[1].replace(/_/g, " ");

    const activeCompetition = getActiveCompetition(competitionName);
    setActive(activeCompetition ? parseInt(activeCompetition.Id, 10) : -1);
  }, [pathname]);

  return (
    <nav
      className="sticky top-24 space-y-1"
      aria-label="Navegación Principal"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <ul>
        <li>
          <Link
            itemProp="url"
            href="/"
            className={`${
              active === -1
                ? "bg-emerald-900 text-white font-medium"
                : "text-gray-600 hover:bg-emerald-800 hover:text-white"
            } group flex items-center px-3 py-2 text-md font-regular`}
          >
            Todo
          </Link>
        </li>
        {competitions &&
          competitions.map((item) => (
            <li key={item.Id}>
              <Link
                itemProp="url"
                href={`/futbol/campeonato/${item.Name.replace(/ /g, "_")}`}
                className={`${
                  active === parseInt(item.Id, 10)
                    ? "bg-emerald-900 text-white font-medium"
                    : "text-gray-600 hover:bg-emerald-800 hover:text-white"
                } group flex items-center px-3 py-2 text-md font-regular`}
                // aria-current={item.current ? "page" : undefined}
              >
                <span className="truncate">{item.Name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Menu;
