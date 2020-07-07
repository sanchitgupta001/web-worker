/* eslint   no-restricted-globals: 0 */
import React from 'react';
import { useQuery } from 'react-query';

// components
import AppBar from '@material-ui/core/AppBar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import CountryStatsGrid from './components/countryStatsGrid';

window.addEventListener('online', () => {
  location.reload();
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Covid Info
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LOGO_STYLES = {
  height: '1.6rem',
  width: '1.6rem',
  marginLeft: '0.4rem',
};

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
}));

async function fetchAllCountriesInfo() {
  let data;

  try {
    const response = await fetch(
      'https://disease.sh/v2/countries?yesterday=0&allowNull=false'
    );

    data = await response.json();
  } catch (e) {
    console.log(e);
  }

  return data;
}

export default function Album() {
  const classes = useStyles();
  const { data } = useQuery({
    queryKey: 'all-country-info',
    queryFn: fetchAllCountriesInfo,
    config: {
      refetchOnWindowFocus: false,
    },
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <div className="flex align-center">
            <Typography variant="h6" color="inherit" noWrap>
              Covid-19 Info
            </Typography>
            <img
              src={process.env.PUBLIC_URL + '/logo48.png'}
              style={LOGO_STYLES}
            />
          </div>
        </Toolbar>
      </AppBar>
      <main>
        {/*<div className={classes.heroContent}>*/}
        {/*  <Container maxWidth="sm">*/}
        {/*    <Typography*/}
        {/*      component="h1"*/}
        {/*      variant="h2"*/}
        {/*      align="center"*/}
        {/*      color="textPrimary"*/}
        {/*      gutterBottom*/}
        {/*    >*/}
        {/*      Album layout*/}
        {/*    </Typography>*/}
        {/*    <Typography*/}
        {/*      variant="h5"*/}
        {/*      align="center"*/}
        {/*      color="textSecondary"*/}
        {/*      paragraph*/}
        {/*    >*/}
        {/*      Something short and leading about the collection below—its*/}
        {/*      contents, the creator, etc. Make it short and sweet, but not too*/}
        {/*      short so folks don&apos;t simply skip over it entirely.*/}
        {/*    </Typography>*/}
        {/*    <div className={classes.heroButtons}>*/}
        {/*      <Grid container spacing={2} justify="center">*/}
        {/*        <Grid item>*/}
        {/*          <Button variant="contained" color="primary">*/}
        {/*            Main call to action*/}
        {/*          </Button>*/}
        {/*        </Grid>*/}
        {/*        <Grid item>*/}
        {/*          <Button variant="outlined" color="primary">*/}
        {/*            Secondary action*/}
        {/*          </Button>*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*    </div>*/}
        {/*  </Container>*/}
        {/*</div>*/}
        {data ? <CountryStatsGrid stats={data} /> : null}
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
