/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { github } from "../githubConfig";
import { query } from "../api/query";
import { searchStateAtom } from "../state/searchList";

interface IFetchParams {
  name: string;
  count?: number;
}
interface IFetchResult {
  loading: boolean;
  hasMore: boolean;
  fetchMore: (page: number) => void;
}
export const useFetch = ({ name }: IFetchParams): IFetchResult => {
  const { baseUrl, method, headers } = github;
  const [repos, setRepos] = useRecoilState(searchStateAtom);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const fetchMore = () => {
    const queryText = JSON.stringify(query(name, repos.cursor));
    fetch(baseUrl, {
      method,
      headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const searchResult = data.data?.search;
        const { pageInfo } = data.data.search;
        if (searchResult?.repos) {
          setRepos((info) => {
            const newInfo = { ...info };
            newInfo.list = newInfo.list.concat(searchResult.repos);
            newInfo.cursor = pageInfo.endCursor;
            return newInfo;
          });
          setHasMore(pageInfo.hasNextPage);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const queryText = JSON.stringify(query(name));
    if (!name) {
      return;
    }
    setLoading(true);
    fetch(baseUrl, {
      method,
      headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const searchResult = data.data?.search;
        const { pageInfo } = data.data.search;
        if (searchResult?.repos) {
          setRepos((info) => {
            const newInfo = { ...info };
            newInfo.list = searchResult.repos;
            newInfo.cursor = pageInfo.endCursor;
            return newInfo;
          });
          setHasMore(pageInfo.hasNextPage);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return { loading, hasMore, fetchMore };
};
