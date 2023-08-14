"use client";

import { Popover } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import LogoSVG from "./Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Competition 1", href: "#", current: true },
  { name: "Competition 2", href: "#", current: false },
  { name: "Competition 3", href: "#", current: false },
  { name: "Competition 4", href: "#", current: false },
  { name: "Competition 5", href: "#", current: false },
  { name: "Competition 6", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchVal) return;
    router.push(`/search/${searchVal.replace(/ /g, "_")}`);
  };

  return (
    <Popover
      as="header"
      className={({ open }) =>
        classNames(
          open ? "fixed inset-0 z-40 overflow-y-auto" : "",
          "sticky top-0 bg-gradient-to-br from-emerald-800 to-emerald-700 shadow-sm lg:overflow-y-visible"
        )
      }
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
              <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                <div className="flex flex-shrink-0 items-center">
                  <a href="#">
                    <LogoSVG />
                  </a>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div className="flex gap-2 md:gap-3 items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                  <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                      Buscar partido, equipo o competición
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 items-center pl-3 hidden md:flex">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-sm border border-gray-300 bg-white py-2 pl-2 md:pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        placeholder=" Buscar partido, equipo o competición"
                        type="search"
                        onChange={(e) => setSearchVal(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hidden md:block"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                    <div className="bg-green-900 hover:bg-green-700 py-2 px-2 rounded block md:hidden">
                      <MagnifyingGlassIcon
                        className="text-white font-bold h-6 w-6"
                        onClick={handleSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>

          <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "hover:bg-gray-50",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default Header;
