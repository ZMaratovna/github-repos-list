type TotalCount = {
  totalCount: number;
};

export type RepositoryType = {
  repo: {
    id: string;
    url: string;
    name: string;
    description: string;
    descriptionHTML: string;
    createdAt: string;
    updatedAt: string;
    isPrivate: boolean;
    viewerHasStarred: boolean;
    stargazerCount: number;
    watchers: TotalCount;
    issues: TotalCount;
    forks: TotalCount;
    pullRequests: TotalCount;
    languages: {
      nodes: [
        {
          name: string;
          color: string;
        }
      ];
    };
    rate?: number | null;
  };
};

export interface IDataContext {
  loading: boolean;
  data: RepositoryType[] | [];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export enum Filter {
  asc = "asc",
  desc = "desc",
}
