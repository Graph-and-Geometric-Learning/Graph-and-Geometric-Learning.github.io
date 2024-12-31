# Build and Preview
First, make sure you have [Node.js](https://nodejs.org/en/download/package-manager) installed on your computer. Enter the root directory of this repository,
```
npm install
```
to install the dependencies.
```
npm run dev
```
Look at the message in your console, find out the url and open it in your browser (it might be `localhost:3000`).

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


## Project Page
To set up a project page, we support [MDX](https://mdxjs.com/), which is a superset of markdown that lets you write  [JSX](https://react.dev/learn/writing-markup-with-jsx) directly in your markdown files. That is to say, you can write your project page in markdown and include any html elements. We also pre-defined some convenient element for you to use. (e.g. AuthorList).

**Step**
1. Create a folder of your project under `app/projects`.
2. Create a `page.mdx` file under the created folder. This is the main file that contains your page content. Assets (e.g. images) should be uploaded to your project folder as well.
3. Update the `page` key of your publication in `config/publications.ts` with the name of your folder.


Find an example in `app/projects/hybrid`.

### GGLab-flavored Markdown
We extend the markdown syntax to better styling our website. Here are some special usages,
#### Scaling images
Add the `scale=x` option after your title, separated by `|`.
```
![title|scale=0.5](./path/to/your/image)
```

