import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { RepositoryType } from "../typings";

const { persistAtom } = recoilPersist();

export const searchStateAtom = atom({
  key: "SearchStateAtom",
  default: {
    value: "",
    list: [] as RepositoryType[],
    cursor: "",
  },
  effects_UNSTABLE: [persistAtom],
});
