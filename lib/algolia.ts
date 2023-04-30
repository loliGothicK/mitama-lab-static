import { getAllPosts } from './api';
import algoliasearch from 'algoliasearch';
import removeMd from 'remove-markdown';

const Properties = ['slug', 'title', 'excerpt', 'content'] as const;

export const generateIndex = async (): Promise<void> => {
  const objects = ['en', 'ja']
    .flatMap(locale => {
      return getAllPosts<typeof Properties>(locale, Properties).map(post => {
        return {
          locale,
          post,
        };
      });
    })
    .flatMap(({ locale, post }) => {
      const content = removeMd(post.content, { gfm: true });
      const mid = Math.ceil(content.length / 2);

      return [content.slice(0, mid), content.slice(mid)].map((chunk, index) => {
        return {
          objectID: `${post.slug}-${locale}-${index}`,
          url: `https://www.mitama.tech/${locale}/posts/${post.slug}`,
          title: post.title,
          description: post.excerpt,
          content: chunk,
        };
      });
    });

  // 追加
  const client = algoliasearch('RCM8CWQP3S', process.env['ALGOLIA_CLIENT_ID']!);
  const index = client.initIndex('mitama_lab');
  await index.saveObjects(objects, { autoGenerateObjectIDIfNotExist: true });
};
