import type PostType from '../../interfaces/post';
import MitamaLab from '../../layouts/MitamaLab';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import { CurrentHead } from '../../recoil/TocSelector';
import { tocAtom } from '../../recoil/toc';
import {
  Container,
  Divider,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import StickyBox from 'react-sticky-box';
import { useRecoilState, useRecoilValue } from 'recoil';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';
import markdownToHtml from 'zenn-markdown-html';

interface TocItem {
  depth: number;
  title: string;
  id: string;
  children?: TocItem[];
}

type Toc = TocItem[];

type Props = {
  post: PostType;
  toc: Toc;
  preview?: boolean;
};

const IntersectionObservable: React.FC<
  PropsWithChildren<{
    id: string;
    variant: 'h2' | 'h3';
    callback: (head: string) => void;
  }>
> = ({ children, id, variant, callback }) => {
  const { ref } = useInView({
    rootMargin: '-100px',
    onChange: (_, entry) => {
      if (entry.isIntersecting) {
        callback(entry.target.id);
      }
    },
  });

  return (
    <Typography variant={variant} ref={ref} id={id}>
      {children}
    </Typography>
  );
};

const useProcessor = (text: string, callback: (head: string) => void) => {
  const [Content, setContent] = useState(<></>);

  useEffect(() => {
    unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeReact, {
        createElement: React.createElement,
        components: {
          h2: (props: any) => (
            <IntersectionObservable {...props} variant={'h2'} callback={callback} />
          ),
        },
      })
      .process(text)
      .then(file => {
        setContent(file.result);
      });
  }, [text, callback]);

  return Content;
};

const SideToc = ({ toc }: { toc: Toc }) => {
  const currentHead = useRecoilValue(CurrentHead);
  const active = currentHead != '' ? toc.findIndex(item => item.id == currentHead) : 0;

  return (
    <Stepper
      activeStep={active}
      orientation="vertical"
      sx={{ m: 2 }}
      aria-label={'table of contents'}
    >
      {toc.map(item => {
        return (
          <Step key={item.title}>
            <StepLabel>
              <Link href={`#${item.id}`}>
                <Typography variant="caption">{item.title}</Typography>
              </Link>
            </StepLabel>
            {item.children !== undefined ? (
              <StepContent>
                <SideToc toc={item.children} />
              </StepContent>
            ) : (
              <></>
            )}
          </Step>
        );
      })}
    </Stepper>
  );
};

export default function Post({ post, toc }: Props) {
  const router = useRouter();
  const ogImage = useMemo(() => {
    return `https://mitama.tech/api/og?title=${post.title}`;
  }, [post.title]);
  
  const [_, setTOC] = useRecoilState(tocAtom);

  const content = useProcessor(post.content, head => {
    setTOC(_ => head);
  });
  
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
            <Box sx={{ flexGrow: 1 }}>
              <Grid2 container spacing={2}>
                <Grid2 xs={10}>
                  <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'sticky' }}>
                    <div className={'znc'}>{content}</div>
                  </Box>
                </Grid2>
                <Grid2 xs={2}>
                  <StickyBox offsetTop={100}>
                    <Box sx={{ display: 'flex' }}>
                      <Box
                        component="nav"
                        sx={{ flexShrink: { sm: 0 } }}
                        aria-label="table of contents"
                      >
                        <SideToc toc={toc} />
                      </Box>
                    </Box>
                  </StickyBox>
                </Grid2>
              </Grid2>
            </Box>
          </>
        )}
      </Container>
    </MitamaLab>
  );
}

type Params = {
  locale?: string;
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

  const content = markdownToHtml(post.content);

  const appends = (toc: Toc, title: string, id: string, level: number, depth: number = 0): void => {
    if (level == 2) {
      toc.push({
        depth,
        title,
        id,
      });
      return;
    } else {
      return appends((toc.slice(-1)[0]!.children ||= []), title, id, level - 1, depth + 1);
    }
  };

  let toc = [] as Toc;

  const intoValue = (node: string): string => {
    const match = node.match(/<[\s\S]+?>(.*)<[\s\S]+?>/);
    if (!match) return node;
    else {
      const child = match[1];
      return child ? intoValue(child) : node;
    }
  };

  for (const match of content.matchAll(/<h(\d) id="(.+?)"><a [\s\S]+?><\/a>(.+)<\/h\d>/g)) {
    appends(toc, intoValue(match[3]!), match[2]!, Number(match[1]!));
  }

  return {
    props: {
      toc: toc,
      post: {
        ...post,
        content,
      },
    },
  };
};

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
