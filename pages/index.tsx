import MitamaLab from '../layouts/MitamaLab';
import { GitHub } from '@mui/icons-material';
import { Avatar, CardHeader, CardMedia, Container, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import type { NextPage } from 'next';
import Link from 'next/link';

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

const pins: Pin[] = [
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
  return (
    <MitamaLab>
      <Container maxWidth={'md'}>
        <img src={'MitamaLab.svg'} alt={'logo'} />
      </Container>
      <Divider sx={{ m: 2 }} />
      <Container maxWidth={'md'}>
        <Splide aria-label="pinned">
          {pins.map(({ repo, title, img }) => {
            return (
              <SplideSlide key={repo}>
                <Item>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="author">
                        <Link href={`https://github.com/LoliGothick/${repo}`}>
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
    </MitamaLab>
  );
};

export default Home;
