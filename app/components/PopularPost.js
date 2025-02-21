"use client";
import { useQuery } from "@tanstack/react-query";
import { extractImage } from "../utils/ExtractImg";
import Image from "next/image";
import Link from "next/link";

const fetchPopular = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_URL}/api/posts/popularpost/${process.env.NEXT_PUBLIC_SITE_ID}`
    );
    if (!response.ok) throw new Error("Failed to fetch popular posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    return [];
  }
};

const PopularPost = () => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["popularposts"],
    queryFn: fetchPopular,
    staleTime: 1000 * 60 * 5,
    retry: 2, 
  });

  return (
    <div className="shadow-xl mb-6">
      <h3 className="text-lg uppercase bg-[#f7f7f7] px-3 py-2 text-center">
        Entradas más vistas
      </h3>
      <div className="px-1">
        {isLoading && <div>Loading popular posts...</div>}
        {isError && <div className="text-red-500">Failed to load posts.</div>}
        {data.length > 0 ? (
          data.map((post, index) => (
            <Link
              href={post.post_slug}
              key={post.id || index}
              className="flex items-start gap-4 py-2 border-b"
            >
              <Image
                src={extractImage(post.post_desc)}
                alt={post.post_title}
                className="resent_post"
                width={100}
                height={100}
                loading="lazy" 
              />
              <div className="flex justify-center w-full">
                <h4 className="text-sm">{post.post_title}</h4>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No popular posts available.
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularPost;
