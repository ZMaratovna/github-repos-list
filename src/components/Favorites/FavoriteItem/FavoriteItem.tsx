/* eslint-disable react/react-in-jsx-scope */
import { produce } from "immer";
import { useSetRecoilState } from "recoil";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Link,
  Rating,
  Typography,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import { RepositoryType } from "../../../typings";
import { FavoritesListState } from "../../../state/favorites";
import { ForkIcon } from "../../GitHubIcons/ForkIcon";
import { IssuesIcon } from "../../GitHubIcons/IssuesIcon";
import { PRIcon } from "../../GitHubIcons/PRIcon";

import styles from "./FavoriteItem.module.scss";

export const FavoritesItem = ({
  info,
}: {
  info: RepositoryType;
}): JSX.Element => {
  const setFavorites = useSetRecoilState<RepositoryType[]>(FavoritesListState);
  const { repo } = info;

  const removeFavoriteItem = () => {
    setFavorites(
      produce((favList) => favList.filter((item) => item.repo.id !== repo.id))
    );
  };
  const handleRatingChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setFavorites(
      produce((favList) => {
        const index = favList.findIndex((item) => item.repo.id === repo.id);
        favList[index].repo.rate = value;
      })
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
          <span className={styles.rating}>
            <Rating
              value={repo.rate}
              onChange={handleRatingChange}
              size="small"
            />
          </span>
        </Box>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button
          onClick={removeFavoriteItem}
          className={styles["actions-remove"]}
          variant="text"
        >
          delete
        </Button>
      </CardActions>
    </Card>
  );
};
