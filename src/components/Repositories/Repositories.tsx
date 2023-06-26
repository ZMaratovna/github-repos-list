/* eslint-disable react/react-in-jsx-scope */
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Toolbar,
} from "@mui/material";

import { RepositoryType } from "../../typings";

import styles from "./Repositories.module.scss";
import { Search } from "./Search";
import { RepositoryItem } from "./RepositoryItem";

interface IRepositories {
  onSearch: (value: string) => () => void;
  fetchMore: (page: number) => void;
  hasMore: boolean;
  searchList: RepositoryType[];
  loading: boolean;
}

export const Repositories = ({
  onSearch,
  fetchMore,
  searchList,
  loading,
  hasMore,
}: IRepositories): JSX.Element => {
  const navigate = useNavigate();
  const navigateToFavorites = () => {
    navigate("/favorites", { replace: true });
  };
  return (
    <Box className={styles.wrapper}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar className={styles.toolbar}>
          <Search onSearch={onSearch} />
          <Button
            variant="text"
            onClick={navigateToFavorites}
            className={styles.favorites}
          >
            Favorites
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={styles["inner-wrapper"]}>
        {loading ? (
          <CircularProgress />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={fetchMore}
            hasMore={hasMore}
            loader={<CircularProgress />}
            className={styles["infinite-scroll"]}
          >
            <Paper className={styles.container} elevation={0}>
              {searchList.map((r) => (
                <RepositoryItem key={r.repo.id} info={r} />
              ))}
            </Paper>
          </InfiniteScroll>
        )}
      </Container>
    </Box>
  );
};
