import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import BlogMeta from "../../../components/BlogMeta";
import { BlogpostMarkdown } from "../../../components/BlogpostMarkdown";
import DirectusImage from "../../../components/DirectusImage";
import type { Blogpost } from "../../../lib/directus";
import { getPostById } from "../../../lib/directus";

// FIXME: Add metadata generation
async function getPost(postId: string) {
  // Call an external API endpoint to get posts
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return getPostById(postId);
}

// export async function generateMetadata(
//     { id }: BlogParams,
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//
//   // fetch data
//   //const blog = await getPost(id)
//   return {
//     title: "test", //blog.title,
//     description: "test" //blog?.description
//   }
// }
const BlogpostView = async ({ params }: { params: { id: string } }) => {
  const post: Blogpost = await getPost(params.id);
  return post !== undefined ? (
    <div className="flex flex-col items-center">
      <div className="mx-4 flex w-[90vw] flex-row justify-between">
        <Link href="/blog" legacyBehavior>
          <button
            type="button"
            className="transition-all hover:scale-150 md:text-2xl"
          >
            <FontAwesomeIcon
              aria-label="Back to list"
              icon={faArrowAltCircleLeft}
            />
          </button>
        </Link>
        <h2 className="hidden w-48 font-roboto text-xl opacity-50 md:inline md:text-sm">
          {post.title!}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-items-center gap-y-2">
        <div className="grid gap-y-4">
          <div className="row-span-1 flex justify-center">
            <div className="relative size-96 overflow-hidden ">
              <DirectusImage
                src={post.thumbnail}
                alt="Titelbild"
                objectFit="contain"
                className="rounded-sm"
              />
            </div>
          </div>
          <div className="">
            <BlogMeta tags={post.tags} date={post.date_created} />
          </div>
        </div>
        <div />
      </div>
      <article
        className="prose-p:text-dark-4 prose-headings:text-dark-4 prose-p:text-md
              prose-div:border-4
      prose
      prose-invert
      min-w-[65vw]
      max-w-[90vw]
       flex-col justify-items-center
       bg-inherit prose-pre:bg-inherit
       prose-pre:opacity-90 prose-pre:first:border-accent
       dark:prose-pre:text-xs
       xl:prose-p:text-xl"
      >
        <h2>{post.title!}</h2>
        <BlogpostMarkdown markdown={post.content!} />{" "}
      </article>
    </div>
  ) : (
    <div>No Blogdata</div>
  );
};

export default BlogpostView;
