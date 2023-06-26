import { Filter, RepositoryType } from "../typings";

export const sort = (
  arr: RepositoryType[],
  filter: Filter
): RepositoryType[] => {
  const arrCopy = [...arr];
  return filter === Filter.desc
    ? arrCopy.sort(({ repo: repoA }, { repo: repoB }) => {
        const b = repoB.rate || 0;
        const a = repoA.rate || 0;
        return b - a;
      })
    : arrCopy.sort(({ repo: repoA }, { repo: repoB }) => {
        const b = repoB.rate || 0;
        const a = repoA.rate || 0;
        return a - b;
      });
};
