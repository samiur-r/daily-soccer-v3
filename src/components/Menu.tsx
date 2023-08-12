import { CompetitionType } from "@/types/competition";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface MenuProps {
  competitions: CompetitionType[];
}

const Menu: React.FC<MenuProps> = ({ competitions }) => {
  return (
    <nav
      className="sticky top-24 space-y-1"
      aria-label="Navegación Principal"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <ul>
        {competitions &&
          competitions.map((item) => (
            <li key={item.Id}>
              <a
                itemProp="url"
                href={`/futbol/campeonato/${item.Name}`}
                // className={classNames(
                //   item.current
                //     ? "bg-emerald-900 text-white font-medium"
                //     : "text-gray-600 hover:bg-emerald-800 hover:text-white",
                //   "group flex items-center px-3 py-2 text-md font-regular"
                // )}
                // aria-current={item.current ? "page" : undefined}
              >
                <span className="truncate">{item.Name}</span>
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Menu;
