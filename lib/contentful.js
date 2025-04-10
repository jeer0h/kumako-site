import { createClient } from 'contentful';

console.log ("spaceid", process.env.CONTENTFUL_SPACE_ID);
console.log ("spaceaccestokn", process.env.CONTENTFUL_ACCESS_TOKEN);

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchSiteContent(slug) {
  const entries = await client.getEntries({
    content_type: 'siteContent',
    'fields.slug': slug,
  });

  return entries.items[0]?.fields || null;
}

export default client;