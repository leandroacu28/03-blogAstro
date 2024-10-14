import rss from '@astrojs/rss';
import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';

// Outputs: /builtwith.json
export const GET:APIRoute=async ({params, request, site}) =>{

    const blogPosts= await getCollection('blog');

    return rss({
        // `<title>` field in output xml
        title: 'Leandro Blog',
        // `<description>` field in output xml
        description: 'Un simplre blog sobre mi y mis aventuras con astro',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site:site ?? '',
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPosts.map(({data,slug}) =>({
            stylesheet:'/styles/rss.xsl',
            title:data.title,
            pubDate:data.date,
            description:data.description,
            link:`posts/${slug}`,
        })),
        // (optional) inject c  ustom xml
        customData: `<language>es-mx</language>`,
      });
  }