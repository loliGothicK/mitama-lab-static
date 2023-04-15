import MitamaLab from '../layouts/MitamaLab';
import { GitHub } from '@mui/icons-material';
import {
  Avatar,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 500,
}));

type Pin = {
  repo: string;
  title: string;
  img: string;
};

const libraries: Pin[] = [
  {
    repo: `deriving_via`,
    title: `Flexible deriving macro for newtype pattern.`,
    img: `DerivingVia.svg`,
  },
  {
    repo: `sized_bitset`,
    title: `A statically-sized bitset library.`,
    img: `sized-bitset.svg`,
  },
  {
    repo: `mitama-result`,
    title: `A Library that provides result and maybe and monadic functions for them.`,
    img: `mitama-result.svg`,
  },
  {
    repo: `mitama-dimensional`,
    title: `C++17 Library for dimensional analysis based on variadic Phantom-Type.`,
    img: 'https://raw.githubusercontent.com/LoliGothick/mitama-dimensional/master/mitama-dimensional-logo.png',
  },
];

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{'Mitama Lab.'}</title>

        <meta property="og:type" content="site" />
        <meta property="og:title" content={'Mitama Lab.'} />
        <meta property="og:description" content={'Coding and Ramen'} />
        <meta property="og:url" content={router.pathname} />
        <meta property="og:site_name" content={'Mitama Lab.'} />
        <meta
          property="og:image"
          content={
            'https://raw.githubusercontent.com/LoliGothick/mitama-lab-static/main/public/MitamaLab.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mitama_rs" />
      </Head>
      <MitamaLab>
        <Container
          maxWidth={'lg'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '90vh',
          }}
        >
          <Typography variant="h2" sx={{ margin: 10, fontWeight: 'bold' }}>
            {'Coding and Ramen'}
          </Typography>
          <Divider sx={{ m: 2 }} />
          <Typography variant={'h6'} sx={{ m: 2, flexGrow: 1 }}>
            {
              'Coding and ramen may seem like an unlikely pair, but they share one key ingredient: dedication. '
            }
            {
              'Just as master ramen chefs perfect their recipes, ' +
              'skilled coders devote countless hours to honing their craft. '
            }
            {
              'And just as the perfect bowl of ramen can bring comfort and nourishment,' +
              'a well-written code can bring functionality and innovation to the world.'
            }
          </Typography>
          <Typography variant="h4" sx={{ margin: 10, fontWeight: 'bold' }}>
            {"What's in Mitama Lab?"}
          </Typography>
        </Container>
        <Divider sx={{ m: 2 }} />
        <Container
          maxWidth={'lg'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '90vh',
          }}
        >
          <Typography variant="h6" sx={{ margin: 10, fontWeight: 'bold' }}>
            {'My Libraries'}
          </Typography>
          <Splide aria-label="pinned" title={'Libraries'}>
            {libraries.map(({ repo, title, img }) => {
              return (
                <SplideSlide key={repo}>
                  <Item>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="author">
                          <Link href={`https://github.com/LoliGothick/${repo}`} aria-label={repo}>
                            <GitHub />
                          </Link>
                        </Avatar>
                      }
                      title={title}
                    />
                    <CardMedia component="img" image={img} alt={repo} />
                  </Item>
                </SplideSlide>
              );
            })}
          </Splide>
        </Container>
        <Container
          maxWidth={'lg'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '90vh',
          }}
        >
          <Typography variant="h6" sx={{ margin: 10, fontWeight: 'bold' }}>
            {'Other Works'}
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Item>TODO</Item>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MitamaLab>
    </>
  );
};

export default Home;
