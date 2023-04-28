import Post from '../interfaces/post';
import MitamaLab from '../layouts/MitamaLab';
import { getAllPosts } from '../lib/api';
import languageDetector from '../lib/languageDetector';
import {
  Avatar,
  Button,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

type Props = {
  allPosts: Post[];
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PostCard = ({ title, excerpt, slug, coverImage }: Post) => {
  return (
    <Item sx={{ minHeight: 'lg' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="author">
            M
          </Avatar>
        }
        title={title}
      />
      <CardMedia component="img" image={coverImage} alt={title} />
      <Typography>{excerpt}</Typography>
      <Link href={`/posts/${slug}`}>
        <Button size="small">Read More</Button>
      </Link>
    </Item>
  );
};

export default function Blog({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <MitamaLab>
      <Container maxWidth={'lg'}>
        <PostCard {...heroPost} />
        <Divider sx={{ m: 2 }} />
        <Grid container spacing={2}>
          {morePosts.map(post => {
            return (
              <Grid item xs={4} key={post.title}>
                <PostCard {...post} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MitamaLab>
  );
}

export const getStaticProps = async () => {
  const locale = languageDetector.detect() || 'ja';

  const allPosts = getAllPosts(locale, [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};
