/* eslint-disable react/react-in-jsx-scope */
import { useMemo } from "react";
import { useRecoilState } from "recoil";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

import { RepositoryType } from "../../../typings";
import { FavoritesListState } from "../../../state/favorites";
import { ForkIcon } from "../../GitHubIcons/ForkIcon";
import { IssuesIcon } from "../../GitHubIcons/IssuesIcon";
import { PRIcon } from "../../GitHubIcons/PRIcon";

import styles from "./RepositoryItem.module.scss";

export const RepositoryItem = ({
  info,
}: {
  info: RepositoryType;
}): JSX.Element => {
  const [favorites, setFavorites] =
    useRecoilState<RepositoryType[]>(FavoritesListState);
  const { repo } = info;
  const isFav = useMemo(() => {
    return favorites.find((f) => f.repo.id === info.repo.id) !== undefined;
  }, [favorites, info.repo.id]);
  console.log(repo.languages.nodes[0]);

  const toggleFavoriteItem = () => {
    !isFav
      ? setFavorites((favList: RepositoryType[]) => [...favList, info])
      : setFavorites((favList: RepositoryType[]) =>
          favList.filter((item) => item.repo.id !== repo.id)
        );
  };
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <Box className={styles.title}>
          <Link href={repo.url} target="_blank">
            <Typography variant="h6" component="h6">
              {repo.name}
            </Typography>
          </Link>
          <Chip
            className={styles.privacy}
            label={`${repo.isPrivate ? "Private" : "Public"}`}
            variant="outlined"
          />
        </Box>
        <Box className={styles.description}>
          {`${repo.description.slice(0, 200)}` +
            (repo.description.length > 200 ? "..." : "")}
        </Box>
        <Box className={styles.detailsBox}>
          <span className={styles.details}>
            <span
              className={styles.language}
              style={{ backgroundColor: repo.languages.nodes[0]?.color }}
            />
            {repo.languages.nodes[0]?.name}
          </span>
          <span className={styles.details}>
            <IconButton
              href={`${repo.url}/stargazers`}
              target="_blank"
              disableRipple
              disableFocusRipple
            >
              {repo.viewerHasStarred ? (
                <StarIcon className={styles.icon} />
              ) : (
                <StarOutlineIcon className={styles.icon} />
              )}
            </IconButton>
            {repo.stargazerCount}
          </span>
          <span className={styles.details}>
            <ForkIcon />
            {repo.forks.totalCount}
          </span>
          <span className={styles.details}>
            <IconButton
              href={`${repo.url}/issues`}
              target="_blank"
              disableRipple
            >
              <IssuesIcon className={styles.icon} />
            </IconButton>
            {repo.issues.totalCount}
          </span>
          <span className={styles.details}>
            <IconButton href={`${repo.url}/pulls`} disableRipple>
              <PRIcon className={styles.icon} />
            </IconButton>
            {repo.pullRequests.totalCount}
          </span>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={toggleFavoriteItem}
          disableRipple
          disableFocusRipple
          size="medium"
        >
          {isFav ? (
            <FavoriteIcon
              className={styles.icon}
              style={{ fill: "var(--mui-palette-primary-main)" }}
            />
          ) : (
            <FavoriteBorderIcon className={styles.icon} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};
