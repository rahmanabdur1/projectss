
"use client";
import { useParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import CategoryLink from "../components/CategoryLink";
import LoadingImage from "../components/LoadingImage";
import Footer from "../components/Footer";
import Link from "next/link";
import { FaFacebookSquare, FaLinkedin, FaWhatsappSquare, FaArrowCircleLeft } from "react-icons/fa";
import Image from "next/image";
import { extractImage } from "../utils/ExtractImg";
import LeftSideBar from "../components/LeftSideBar";
import AllPosts from "../components/AllPosts";
import Provider from "../service/Provider";
import { debounce } from "lodash";

const Page = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");

  const debouncedSetCategory = useMemo(
    () => debounce((category) => setCategory(category), 300),
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const singlePostFetch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_URL}/api/posts/singlepost/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug,
            postId: process.env.NEXT_PUBLIC_SITE_ID,
          }),
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["singlePost", slug],
    queryFn: singlePostFetch,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onError: (error) => console.error("Error fetching post:", error),
  });

  const currentPost = data?.currentPost;
  const relatedPosts = data?.relatedPosts;
  const previousPost = data?.previousPost;
  const nextPost = data?.nextPost;

  const metaTitle = currentPost?.post_title
    ? `${currentPost.post_title} - Pura+ | Ortopedia Fisioterapia Salud Belleza`
    : "Pura+ | Ortopedia Fisioterapia Salud Belleza";


  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = metaTitle;
    }
  }, [metaTitle]);

  if (isLoading) return <LoadingImage />;
  if (error || !data) return <div className="text-center text-red-500">Error fetching post data!</div>;

  const processedDesc = currentPost?.post_desc?.replace(
    /<img\s+[^>]*src="(\/[^"]*)"/g,
    `<img src="${process.env.NEXT_PUBLIC_CMS_URL}$1"`
  );

  return (
    <Provider>
      <main>
        <Header />
        <section className="pt-24 pb-10">
          <div className="container m-auto">
            <div className="lg:flex lg:gap-10 items-start justify-between">
              <div className="w-full lg:w-9/12">
                <div className="category_wrapper mt-8">
                  <h1 className="hidden">{metaTitle}</h1>
                  <h2 className="text-[#00359f] text-xl text-center">
                    Escoge un tema de lectura
                  </h2>
                  <CategoryLink setFn={debouncedSetCategory} />
                </div>

                {category ? (
                  <AllPosts category={category} />
                ) : (
                  <>
                    <div className="single_post_wrapper">
                      <div className="title_wrappe">
                        <h2 className="text-center text-4xl text-black my-6">
                          {currentPost?.post_title}
                        </h2>
                        <div
                          className="post_desc_wrapper"
                          dangerouslySetInnerHTML={{ __html: processedDesc }}
                        />
                      </div>
                    </div>

                    <div className="share_wrapper">
                      <h2 className="text-center">
                        <span className="border-b text-black text-sm font-bold border-black pb-2 pt-6">
                          Compartelo en tus redes:
                        </span>
                      </h2>
                      <div className="social_icons_wrapper flex items-center justify-center lg:justify-end gap-2 mt-5 lg:mt-0">
                        <Link
                          href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                            currentUrl
                          )}`}
                          target="_blank"
                          className="text-2xl"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookSquare />
                        </Link>
                        <Link
                          href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                            currentUrl
                          )}`}
                          target="_blank"
                          className="text-2xl"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin />
                        </Link>
                        <Link
                          href={`whatsapp://send?text=${encodeURIComponent(
                            currentUrl
                          )}`}
                          target="_blank"
                          className="text-2xl whatsapp_icon_social"
                          rel="noopener noreferrer"
                        >
                          <FaWhatsappSquare />
                        </Link>
                      </div>

                      <div className="relative_category_wrapper gap-10 my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {relatedPosts?.length > 0 &&
                          relatedPosts.map((postCat, index) => (
                            <Link
                              key={index}
                              href={`/${postCat.post_slug}`}
                              className="text-sm text-black text-center"
                            >
                              <Image
                                src={extractImage(postCat.post_desc)}
                                width={240}
                                height={100}
                                className="category_image_relative"
                                alt="Category post"
                              />
                              <span className="mt-3">{postCat.post_title}</span>
                            </Link>
                          ))}
                      </div>
                    </div>
                    
                    <div className="pagination_wrapper flex items-center justify-center gap-3 py-8">
                      {nextPost && (
                        <Link
                          href={`/${nextPost.post_slug}`}
                          className="bg-[#00359f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ffd966] duration-75 flex items-center gap-2"
                        >
                          <FaArrowCircleLeft className="text-[#ffd966]" /> Entrada más reciente
                        </Link>
                      )}
                      {previousPost && (
                        <Link
                          href={`/${previousPost.post_slug}`}
                          className="bg-[#00359f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ffd966] duration-75"
                        >
                          Entrada más antigua
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="w-full lg:w-3/12">
                <LeftSideBar />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Provider>
  );
};

export default Page;
