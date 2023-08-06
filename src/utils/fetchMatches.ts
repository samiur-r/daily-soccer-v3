const fetchMatches = async (page: number) => {
  const res = await fetch(process.env.NEXT_PUBLIC_JSON_URL as string);
  const matches = await res.json();
  const totalItems = matches.length;

  const startIdx = (page - 1) * 10;
  const endIdx = startIdx + 10;
  const paginatedData: any = matches.slice(startIdx, endIdx);

  return { matches: paginatedData, totalItems };
};

export default fetchMatches;
