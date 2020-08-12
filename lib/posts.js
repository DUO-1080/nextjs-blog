import path from "path";
import fs from "fs";
import matter from "gray-matter";

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

// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");

// export function getSortedPostsData() {
//   // Get file names under /posts
//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames.map((fileName) => {
//     // Remove ".md" from file name to get id
//     const id = fileName.replace(/\.md$/, "");

//     // Read markdown file as string
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);

//     // Combine the data with the id
//     return {
//       id,
//       ...matterResult.data,
//     };
//   });
//   // Sort posts by date
//   return allPostsData.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
// }
