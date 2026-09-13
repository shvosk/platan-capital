import { groq } from 'next-sanity';

// Generic page lookup by slug — page content fields (title, body, hero, etc.)
// are localized objects, e.g. { en, am, ru }, resolved on the frontend.
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    seoDescription,
    sections
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    firmName,
    tagline,
    email,
    officeAddress,
    legalDisclaimer
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    bio,
    photo,
    linkedinUrl
  }
`;
