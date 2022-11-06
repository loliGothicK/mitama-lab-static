import { Container, Divider, Grid, Typography } from '@mui/joy';

import React from 'react';

import ContentCard from '../components/ContentCard';

const Home: React.FC = () => {
  return (
    <Container>
      <Container sx={{ flex: 'auto' }}>
        <img src={'/MitamaLab.svg'} alt={'logo'} width={'80%'} />
      </Container>
      <Divider sx={{ margin: '5% 0' }} />
      <Typography level={'h2'}>Recant Updated Contents</Typography>
      <Divider sx={{ margin: '5% 0' }} />
      <Grid container spacing={2}>
        <Grid xs={4}>
          <ContentCard
            to={'/mitamatch-operations/features/v2_0_0'}
            title={'Mitamatch Operation v2.0.0'}
            description={'Announcing Mitamatch Operation v2.0.0!'}
            createdAt={'2022-11-04'}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
