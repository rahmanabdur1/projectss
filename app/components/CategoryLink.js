
"use client";

import { useQuery } from "@tanstack/react-query";


const CategoryLink = ({ setFn, }) => {
 
  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_URL}/api/category/site/${process.env.NEXT_PUBLIC_SITE_ID}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching category:", error);
      return []; 
    }
  };

 
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });


  if (isLoading) return <div className="text-center">Loading categories...</div>;


  if (isError) return <div className="text-center text-red-500">Failed to load categories: {error.message}</div>;

  return (
    <div className="my-4 text-center text-sm">
      {data?.length === 0 ? (
        <div>No categories available.</div>
      ) : (
        data.map((cat) => (
          <button
            onClick={() => setFn(cat.cat_id)}
            className="rounded m-2"
            key={cat.cat_id} 
          >
            <span className="bg-[#c8d3de] px-3 py-1 text-[#00359f]">
              {cat.cat_name}
            </span>
            <span className="bg-[#00359f] px-2 py-1 text-white">
              ({cat.post_count})
            </span>
          </button>
        ))
      )}
    </div>
  );
};

export default CategoryLink;
