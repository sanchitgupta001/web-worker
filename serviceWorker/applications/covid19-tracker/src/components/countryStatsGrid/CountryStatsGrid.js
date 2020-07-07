/**
 * Created by sanchitgupta001 on 16/06/2020
 */
import React, { memo, useCallback, useMemo, useState } from 'react';

// lodash
import _debounce from 'lodash/debounce';
import _map from 'lodash/map';

// components
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CountryStatsCard from '../countryStatsCard';

// utils
import { makeStyles } from '@material-ui/core/styles';

// styles
import './countryStatsGrid.scss';

const DEFAULT_STYLES = {
  cardGrid: {
    marginTop: '12px',
    paddingBottom: '64px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
};

const INPUT_STYLES = {
  marginTop: '3rem',
  width: '31%',
  height: '2.4rem',
  padding: '0 0.4rem',
  fontSize: '1rem',
};

const useStyles = makeStyles(() => DEFAULT_STYLES);

function CountrySearch({ onChange }) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const searchVal = e.target.value;
    setSearchValue(searchVal);
    onChange(searchVal);
  };

  return (
    <input
      value={searchValue}
      onChange={handleInputChange}
      placeholder="Search Country"
      style={INPUT_STYLES}
    />
  );
}

function CountryStatsGrid({ stats }) {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState(stats);

  const handleSearch = useCallback(
    (searchInputVal) => {
      const results = _map(
        stats,
        (stat) => {
          if (
            !stat.country.toLowerCase().includes(searchInputVal.toLowerCase())
          ) {
            return { ...stat, className: 'hidden' };
          }

          return stat;
        },
        []
      );

      setSearchResults(results);
    },
    [stats]
  );

  const debouncedHandleSearch = useMemo(() => _debounce(handleSearch, 500), [
    handleSearch,
  ]);

  return (
    <Container maxWidth="md">
      <CountrySearch onChange={debouncedHandleSearch} />
      <Grid container spacing={4} className={classes.cardGrid}>
        {searchResults.map((stat) => (
          <CountryStatsCard
            cardClassName={`${stat.className} ${classes.card}`}
            cardMediaClassName={classes.cardMedia}
            cardContentClassName={classes.cardContent}
            key={stat.country}
            active={stat.active}
            country={stat.country}
            deaths={stat.deaths}
            flagImg={stat.countryInfo.flag}
            recovered={stat.recovered}
            totalCases={stat.cases}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default memo(CountryStatsGrid);
