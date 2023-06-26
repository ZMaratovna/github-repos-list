import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import './App.scss'
import { Favorites } from "./components/Favorites";
import { Repositories } from "./components/Repositories";
import { Experimental_CssVarsProvider } from "@mui/material";
import { useRecoilState } from "recoil";
import { useFetch } from "./hooks/useFetch";
import { searchStateAtom } from "./state/searchList";
import { useCallback } from "react";
import { RepositoryType } from "./typings";

function App(): JSX.Element {
  const [search, setSearch] = useRecoilState<{value: string, list: RepositoryType[]}>(searchStateAtom);
  const {loading, hasMore, fetchMore} = useFetch({name: search.value})

    const onSearch = useCallback((value: string) => () => {
    setSearch((search) => {
      const newSearch = {...search};
      newSearch.value = value
      return newSearch
    })}, [setSearch]);
  
  return ( 
    <Experimental_CssVarsProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Repositories
            onSearch={onSearch}
            searchList={search.list}
            loading={loading}
            fetchMore={fetchMore}
            hasMore={hasMore}
          />
          }
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      </BrowserRouter>
    </Experimental_CssVarsProvider>
  );
}

export default App
