import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import LoadingImage from "./LoadingImage";
import Link from "next/link";
import Image from "next/image";
import { extractImage } from "../utils/ExtractImg";

const AllPosts = ({ category }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_URL}/api/posts/site/${process.env.NEXT_PUBLIC_SITE_ID}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    staleTime: 300000, 
  });

  
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((post) => {
      const titleMatch = searchTerm
        ? post.post_title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const categoryMatch = category !== null ? Number(post.post_cat) === category : true;
      return titleMatch && categoryMatch;
    });
  }, [data, searchTerm, category]);

  return (
    <div>
      <div className="search_wrapper flex gap-5 items-center justify-center my-6">
        <input
          type="search"
          className="bg-[#c8d3de] text-[#00359f] outline-0 px-4 py-2 font-bold"
          placeholder="Inserta una palabra clave"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="font-bold border-0 bg-[#f5f6f7] py-2 px-3"
          onClick={() => setSearchTerm(searchTerm)}
        >
          Buscar
        </button>
      </div>

      {isLoading && <LoadingImage />}
      {isError && <div className="text-center text-red-500">Failed to load posts: {error.message}</div>}
      {!isLoading && filteredData.length > 0 && (
        <div className="post_wrapper gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((elem) => (
            <div className="relative group" key={elem.post_id}>
              <Link href={elem.post_slug}>
                <Image
                  src={extractImage(elem.post_desc)}
                  width={265}
                  height={260}
                  alt="Post image"
                  loading="lazy"
                />
                <div className="absolute top-0 opacity-0 group-hover:opacity-100 flex items-center justify-center h-full w-full bg-[#0000005c] text-white text-2xl">
                  <h4>{elem.post_title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {!isLoading && filteredData.length === 0 && (
        <div className="text-center mt-5">No posts available.</div>
      )}
    </div>
  );
};

export default AllPosts;
