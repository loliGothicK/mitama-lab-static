import Post from '../interfaces/post';
import PostType from '../interfaces/post';
import MitamaLab from '../layouts/MitamaLab';
import { getAllPosts } from '../lib/api';
import { CardMedia, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PostCard = ({ slug, title, excerpt, coverImage }: Post) => {
  return (
    <Item sx={{ minHeight: 300 }}>
      <Link href={`/posts/${slug}`}>
        <CardMedia component="img" image={coverImage} alt={title} sx={{ height: 200 }} />
      </Link>
      <Typography>{excerpt}</Typography>
    </Item>
  );
};

export default function Blog({ allPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const heroPost = allPosts[0];

  if (heroPost === undefined) {
    return <div>{'No blog post here...'}</div>;
  }

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

const PostProperties = [
  'title',
  'date',
  'slug',
  'author',
  'coverImage',
  'excerpt',
  'ogImage',
  'content',
] as const;

export const getStaticProps: GetStaticProps<{ allPosts: PostType[] }> = async ({ locale }) => {
  const allPosts = getAllPosts<typeof PostProperties>(locale || 'ja', PostProperties).sort(
    (p1, p2) => (p1.date < p2.date ? 1 : -1),
  );

  return {
    props: { allPosts },
  };
};
