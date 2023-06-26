import { Divider, IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useCallback, useState } from "react"

import styles from './Search.module.scss'
import { useRecoilValue } from "recoil"
import { searchStateAtom } from "../../../state/searchList"

interface ISearchProps {
  onSearch: (value: string) => () => void
}
export const Search = ({ onSearch }: ISearchProps):JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const {value} = useRecoilValue(searchStateAtom);

  const handlePressEnter = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue)()
    }
  }, [inputValue, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const clearSearch = () => {
    setInputValue('')
  }
 return (
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onKeyDown={handlePressEnter}
      className={styles.inputContainer}
      elevation={0}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search github repo by name or description' }}
        onChange={handleChange}
        value={inputValue}
        className={styles.input}
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={onSearch(inputValue)}
        focusRipple={false}
        className={styles.icon}
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        onClick={clearSearch}
        className={styles.icon}
      >
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}