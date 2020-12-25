import { fade } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Restaurant } from '../models/restaurant.model';
import { apiInstance } from '../shared/utils/http-client';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AutoCompleteSearchInput({ disabled }: { disabled: boolean }) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState<Restaurant | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Restaurant[]>([]);

  const fetch = async (request: { input: string }, callback: (response?: Restaurant[]) => void) => {
    try {
      const response = await apiInstance.get(`/restaurants/search?name=${request.input}`);
      callback(response.data);
    } catch (e) {
      callback([]);
    }
  };

  const memoFetch = React.useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: Restaurant[]) => void) => {
        fetch(request, callback);
      }, 300),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    memoFetch({ input: inputValue }, (results?: Restaurant[]) => {
      if (active) {
        let newOptions = [] as Restaurant[];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, memoFetch]);

  return (
    <Autocomplete
      disabled={disabled}
      id="autocomplete-search-input"
      style={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: Restaurant | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        if (newValue) {
          history.push(`/restaurants/${newValue._id}`);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={`${disabled ? 'Log in to search' : 'Search…'}`}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search', ...params.inputProps }}
          />
        </div>
      )}
      renderOption={(option) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part: { text: string; highlight: boolean }, index: number) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {`${option.address.city}, ${option.address.street}`}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
