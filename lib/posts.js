import path from "path";
import fs from "fs";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postDirectory);

  const allPosts = fileNames.map((file) => {
    const id = file.replace(/\.md$/, "");

    const fullPath = path.join(postDirectory, file);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPosts.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);

  // return a Object list, each object must have the 'params' key, and contain an object
  // with the `id` key. match the dynamic router file [id].js
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
