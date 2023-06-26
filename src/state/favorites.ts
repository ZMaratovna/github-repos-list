import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { RepositoryType } from "../typings";

const { persistAtom } = recoilPersist();

export const FavoritesListState = atom({
  key: "FavoritesList",
  default: [] as RepositoryType[],
  effects_UNSTABLE: [persistAtom],
});
