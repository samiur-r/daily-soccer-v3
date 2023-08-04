export interface MatchType {
  Id: string;
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
    Id: string;
    Name: string;
    Image: string;
  }>;
}
