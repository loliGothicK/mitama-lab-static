import PostBody from '../../components/post-body';
import type PostType from '../../interfaces/post';
import MitamaLab from '../../layouts/MitamaLab';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import { Container, Divider, Typography } from '@mui/material';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import markdownToHtml from 'zenn-markdown-html';
import languageDetector from '../../lib/languageDetector';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post }: Props) {
  const router = useRouter();

  const ogImage = useMemo(() => {
    return `https://mitama.tech/api/og?title=${post.title}`;
  }, [post.title]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
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

              <meta property="og:type" content="article" />
              <meta property="og:title" content={post.title} />
              <meta property="og:description" content={post.excerpt} />
              <meta property="og:url" content={router.pathname} />
              <meta property="og:site_name" content={'Mitama Lab.'} />
              <meta property="og:image" content={ogImage} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@mitama_rs" />
            </Head>
            <Typography variant={'h2'} component={'h3'}>
              {post.title}
            </Typography>
            <Divider sx={{ m: 2 }} />
            <PostBody content={post.content} />
          </>
        )}
      </Container>
    </MitamaLab>
  );
}

type Params = {
  locale?: string,
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ locale, params }: Params) => {
  const post = getPostBySlug(params.slug, locale || 'ja', [
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

export async function getStaticPaths({ locales }: { locales: string[] }) {
  return {
    paths: locales.flatMap(locale => {
      const posts = getAllPosts(locale, ['slug']);
      return posts.map(post => {
        return { params: { slug: post.slug }, locale: locale };
      });
    }),
    fallback: false,
  };
}
