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

export async function fetchEvents() {
  const entries = await client.getEntries({
    content_type: 'event',
    order: 'fields.date',
  });

  return entries.items.map((item) => {
    const host = item.fields.host?.fields;
    const avatarUrl = host?.profileImage?.fields?.file?.url;

    return {
      title: item.fields.title,
      date: item.fields.date,
      description: item.fields.description,
      hostName: host?.name || '',
      hostAvatar: avatarUrl ? `https:${avatarUrl}` : null,
    };
  });
}

export default client;