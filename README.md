# Update Guide

Lab members can update their bios, publications, and news on the website. The update is made through a pull request submitted by the member and approved by the website admin. Make sure your updates are accurate and properly formatted.
**NOTE**: The pull request should be made in terms of the `master` branch.

## Publications
Publications are stored in `config/publications.ts`. Each publication item is a json-like dictionary, with the following fields

```typescript
export interface Publication {
  title: string;
  authors: string;
  venue: string;
  page: string | null;
  paper: string;
  code: string | null;
  tags: Tag[];
}
```
Find examples in the same file.

## Bio
The information is stored in `config/people.ts`. Update the content of yours accordingly. If you want to update your headshot, upload your photo to `/public/people`. Find examples in the same file.

## News
News should be inserted here
https://github.com/Graph-and-Geometric-Learning/Graph-and-Geometric-Learning.github.io/blob/d294a5bb559925e109aa7117faa575f9543da622/app/page.tsx#L44-L46

The news item should be wrapped by `<li>...</li>`. Wrap the text with `<Link href="link.com">...</Link>` if you want to add a link to your text. Check examples in the same file for reference.
