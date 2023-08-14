import type { Metadata } from "next";

import { searchMatches } from "@/services/matches";
import MatchList from "@/components/MatchList";
import RightMenu from "@/components/RightMenu";
import sanitizeUrl from "@/utils/sanitizeUrl";

const filterMatchesBySearchValue = async (search_value: string) => {
  try {
    const response = await searchMatches(sanitizeUrl(search_value), 1);
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

type SearchMatchesProps = {
  params: { search_value: string };
};

export async function generateMetadata({
  params,
}: SearchMatchesProps): Promise<Metadata> {
  const search_value = params.search_value.replace(/_/g, " ");

  return {
    title: `Partidos de ${search_value}`,
    description: `Partidos de ${search_value}`,
  };
}

const SearchedMatches = async ({
  params,
}: {
  params: { search_value: string };
}) => {
  const { matches, totalItems }: any = await filterMatchesBySearchValue(
    params.search_value
  );

  return (
    <div className="flex gap-7">
      <div className="flex-1">
        <MatchList
          matches={matches}
          totalItems={totalItems}
          title={
            params.search_value
              ? `Results for ${sanitizeUrl(params.search_value)}`
              : null
          }
        />
      </div>
      <div className="flex-initial w-72 hidden xl:block">
        <RightMenu
          headline={
            params.search_value ? sanitizeUrl(params.search_value) : null
          }
        />
      </div>
    </div>
  );
};

export default SearchedMatches;
