import rss from '@astrojs/rss';
import { formatPosts } from '../constants';

const postImportResult = import.meta.glob('./writing/**/*.md', {eager: true})

const posts = formatPosts(Object.values(postImportResult))

export async function GET(context) {

  return rss({
    stylesheet: '/rss/styles.xsl',
    title: 'Sahilow Blog',
    description: 'Thoughts in digital form',
    site: context.site,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
      description: post.frontmatter.description,
      link: post.url
    })),
  });
}