import {Container, Divider, Typography} from '@mui/material';

import ErrorPage from 'next/error';
import Head from 'next/head';
import {useRouter} from 'next/router';
import markdownToHtml from 'zenn-markdown-html';

import PostBody from '../../components/post-body';
import type PostType from '../../interfaces/post';
import MitamaLab from '../../layouts/MitamaLab';
import {getAllPosts, getPostBySlug} from '../../lib/api';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({post}: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404}/>;
  }
  return (
    <MitamaLab>
      <Container>
        {router.isFallback ? (
          <Typography>{'Loading…'}</Typography>
        ) : (
          <>
            <Head>
              <title>{post.title}</title>
              <meta property="og:image" content={post.ogImage.url}/>
            </Head>
            <Typography variant={"h1"} component={"h1"}>{post.title}</Typography>
            <Divider sx={{m: 2}}/>
            <PostBody content={post.content}/>
          </>
        )}
      </Container>
    </MitamaLab>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({params}: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = markdownToHtml(post.content || '');
  
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
