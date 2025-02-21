"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import LoadingImage from "../components/LoadingImage";
import Error from "../error";

const queryClient = new QueryClient();
const DataContext = createContext(null);

export const useData = () => useContext(DataContext);


const fetchData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POST_URL}/api/details/${process.env.NEXT_PUBLIC_SITE_ID}`,
    { headers: { "Cache-Control": "no-cache" } }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

const DataProvider = ({ children }) => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mainDetails"],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });

 
  if (isLoading) return <LoadingImage />;
  if (isError) return <Error message={error?.message || "An error occurred"} />;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

const Provider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>{children}</DataProvider>
  </QueryClientProvider>
);

export default Provider;
