import PostType from '../interfaces/post';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug<Fields extends readonly (keyof PostType)[]>(
  slug: string,
  locale: string,
  fields: readonly (keyof PostType)[] = [],
): { [Field in Fields[number]]: PostType[Field] } {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}`, `${locale}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items as unknown as { [Field in Fields[number]]: PostType[Field] };
}

export function getAllPosts<Fields extends readonly (keyof PostType)[]>(
  locale: string,
  fields: readonly (keyof PostType)[] = [],
): { [Field in Fields[number]]: PostType[Field] }[] {
  const slugs = getPostSlugs();
  return slugs.map(slug => getPostBySlug<Fields>(slug, locale, fields));
}
