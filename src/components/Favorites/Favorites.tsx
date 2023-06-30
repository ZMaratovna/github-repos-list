/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import {
  AppBar,
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Toolbar,
} from "@mui/material";

import styles from "./Favorites.module.scss";
import { FavoritesListState } from "../../state/favorites";
import { Filter, RepositoryType } from "../../typings";
import { sort } from "../../utils/sort";
import { FavoritesItem } from "./FavoriteItem/FavoriteItem";

export const Favorites = (): JSX.Element => {
  const favorites = useRecoilValue<RepositoryType[]>(FavoritesListState);
  const [filter, setFilter] = useState<Filter>(Filter.desc);
  const navigate = useNavigate();
  const navigateToSearchPage = () => {
    navigate("/", { replace: true, state: { keepState: true } });
  };
  const handleFilterChange = (e: SelectChangeEvent<Filter>) => {
    setFilter(e.target.value as Filter);
  };
  const sortedList = sort(favorites, filter);
  return (
    <Box className={styles.wrapper}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar className={styles.toolbar}>
          <IconButton onClick={navigateToSearchPage} className={styles.icon}>
            <KeyboardReturnIcon />
          </IconButton>
          <FormControl className={styles["filter-control"]}>
            <InputLabel id="select-label">Sort By</InputLabel>
            <Select
              labelId="select-label"
              id="filter-select"
              value={filter}
              label="Sort By"
              onChange={handleFilterChange}
              size="small"
            >
              <MenuItem value={Filter.desc}>Rating: high to low</MenuItem>
              <MenuItem value={Filter.asc}>Rating: low to high</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper className={styles.container} elevation={0}>
          {sortedList.map((r) => (
            <FavoritesItem key={r.repo.id} info={r} />
          ))}
        </Paper>
      </Container>
    </Box>
  );
};
