/**
 * Created by sanchitgupta001 on 16/06/2020
 */
import React, { memo, useEffect, useState } from 'react';

// components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// styles
import './countryStatsCard.scss';

function Stat({ label, value }) {
  return (
    <Box display="flex" flexDirection="column">
      <Box component="div" fontWeight={600}>
        {label}
      </Box>
      <Box component="div">{value}</Box>
    </Box>
  );
}

function useCheckImgLoad(imageSrc) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const img = new Image();

  img.onload = () => {
    setImgLoaded(true);
  };

  img.src = imageSrc;

  return imgLoaded;
}

function CountryStatsCard({
  cardClassName,
  cardMediaClassName,
  cardContentClassName,
  active,
  totalCases,
  country,
  deaths,
  flagImg,
  recovered,
}) {
  const countryImgLoaded = useCheckImgLoad(flagImg);

  return (
    <Grid item xs={12} sm={6} md={4} className={cardClassName}>
      <Card key={country}>
        {countryImgLoaded ? (
          <CardMedia className={cardMediaClassName} image={flagImg} />
        ) : null}
        <CardContent className={cardContentClassName}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              component="div"
              fontSize="20px"
              fontWeight={600}
              marginBottom="4px"
            >
              {country}
            </Box>
            <Box display="flex" justifyContent="space-between" fontSize="16px">
              <Stat label="Active" value={active} />
              <Stat label="Recovered" value={recovered} />
              <Stat label="Deaths" value={deaths} />
            </Box>
            <Box component="div" fontSize="16px" marginTop="8px">
              <Box component="span" fontWeight={600}>
                Total Cases:
              </Box>
              <Box component="span" marginLeft="8px">
                {totalCases}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default memo(CountryStatsCard);
