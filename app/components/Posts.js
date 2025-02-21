
"use client";
import Link from "next/link";
import TitleWrapper from "./TitleWrapper";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { extractImage } from "../utils/ExtractImg";
import LoadingImage from "./LoadingImage";
import CategoryLink from "./CategoryLink";
import { useState, useMemo } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { useData } from "../service/Provider";

const Posts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(null);
  const [postsToShow, setPostsToShow] = useState(8);

  const sectionData = useData();

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_URL}/api/posts/site/${process.env.NEXT_PUBLIC_SITE_ID}`
    );
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  };

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5, 
  });

  const filteredData = useMemo(() => {
    if (!posts) return [];
    return posts.filter((post) => {
      if (searchTerm) {
        return post.post_title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (category !== null) {
        return Number(post.post_cat) === category;
      }
      return true;
    });
  }, [posts, searchTerm, category]);

  const handleLoadMore = () => setPostsToShow((prev) => prev + 8);

  return (
    <section id="posts" className="pb-10">
      <div className="container m-auto py-8">
        <TitleWrapper
          title={sectionData?.blogSec[0]?.title_text}
          firstLine={sectionData?.blogSec[0]?.text_desc}
        />

        <div className="category_wrapper mt-8 text-center">
          <h2 className="text-[#00359f] text-xl">
            {sectionData?.blogSec[0]?.subtitle_text}
          </h2>
          <CategoryLink setFn={setCategory} totalNumber={posts?.length} />
        </div>

        <div className="search_wrapper flex gap-5 items-center justify-center my-6">
          <input
            type="search"
            className="bg-[#c8d3de] text-[#00359f] outline-0 px-4 py-2 font-bold"
            placeholder="Inserta una palabra clave"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="font-bold bg-[#f5f6f7] py-2 px-3">Buscar</button>
        </div>

        {isLoading ? (
          <LoadingImage />
        ) : isError ? (
          <p className="text-center text-red-500">Error loading posts</p>
        ) : (
          <>
            <div className="post_wrapper gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {filteredData.slice(0, postsToShow).map((elem, index) => (
                <motion.div
                  className="relative group"
                  key={elem.id || index}
                  initial={{ opacity: 0, rotateX: -90 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Link href={elem.post_slug}>
                    <Image
                      src={extractImage(elem.post_desc)}
                      width={265}
                      height={260}
                      alt="Post image"
                      loading="lazy"
                    />
                    <div className="absolute top-0 w-full h-full flex items-center justify-center bg-[#0000005c] text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <h4>{elem.post_title}</h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            {postsToShow < filteredData.length && (
              <div className="text-center mt-6">
                <button
                  className="bg-[#00359f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ffd966] flex items-center gap-2"
                  onClick={handleLoadMore}
                >
                  <FaCirclePlus className="text-[#ffd966]" /> Ver más entradas
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Posts;
