import { getBlogs } from "@/actions/blog.action";
import { BlogPostCard } from "@/components/general/BlogpostCard";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const data = await getBlogs();
  return (
    <>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-medium">Your Blog Articles</h2>

        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPostCard data={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
