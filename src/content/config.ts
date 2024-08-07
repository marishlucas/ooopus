// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      isDraft: z.boolean(),
      title: z.string(),
      sortOrder: z.number().optional(),
      cover: image()
        .refine((img) => img.width >= 1080, {
          message: "Cover image must be at least 1080 pixels wide!",
        })
        .optional(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
      author: z.string().default("Anonymous"),
      language: z.enum(["en", "es"]),
      tags: z.array(z.string()),
      // An optional frontmatter property. Very common!
      footnote: z.string().optional(),
      // In frontmatter, dates written without quotes around them are interpreted as Date objects
      publishDate: z.date(),
      // You can also transform a date string (e.g. "2022-07-08") to a Date object
      // publishDate: z.string().transform((str) => new Date(str)),
      // Advanced: Validate that the string is also an email
      authorContact: z.string().email().optional(),
      // Advanced: Validate that the string is also a URL
      canonicalURL: z.string().url().optional(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
};
