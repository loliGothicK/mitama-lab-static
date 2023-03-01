import MitamaLab from '../layouts/MitamaLab';
import {getAllPosts} from "../lib/api";
import Post from "../interfaces/post";
import {Button, Divider, Grid, Paper, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import Link from "next/link";

type Props = {
  allPosts: Post[]
}

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PostCard = ({title, excerpt, slug}: Post) => {
  return (
    <Item>
      <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography>
        {excerpt}
      </Typography>
      <Link href={`/posts/${slug}`}>
        <Button size="small">Read More</Button>
      </Link>
    </Item>
  );
};

export default function Blog({allPosts}: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <MitamaLab>
      <PostCard {...heroPost} />
      <Divider sx={{ m: 2 }} />
      <Grid container spacing={2}>
        {
          morePosts.map((post) => {
            return (
              <Grid item xs={4} key={post.title}>
                <PostCard {...post} />
              </Grid>
            );
          })
        }
      </Grid>
    </MitamaLab>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])
  
  return {
    props: {allPosts},
  }
}
