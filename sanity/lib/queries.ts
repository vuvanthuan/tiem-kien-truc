import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

export const introductionQuery = defineQuery(`
    *[_type == "introduction" && slug.current == $slug][0] {
      title,
      description,
      content,
      "slug": slug.current
    }
  `);


export const quotationQuery = defineQuery(`
    *[_type == "quotation" && slug.current == $slug][0] {
      title,
      description,
      content,
      "slug": slug.current
    }
  `);

  export const designCategoryWithPostsQuery = `
  *[_type == "designCategory" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    thumbnail,
    "posts": *[_type == "designPost" && references(^._id)] | order(_createdAt desc){
      title,
      thumbnail,
      "slug": slug.current,
      excerpt
    }
  }
`;

export const designPostBySlugQuery = `
  *[_type == "designPost" && slug.current == $slug][0]{
    title,
    thumbnail,
    excerpt,
    "slug": slug.current,
    "category": category->{title, "slug": slug.current},
    content
  }
`;
