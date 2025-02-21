"use client";

import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import { FaShoePrints } from "react-icons/fa";

const Error = () => {
  return (
    <>
      <Header />
      <div className="text-center flex flex-col items-center justify-center h-screen bg-gray-100">
        <div>
          <p className="text-3xl font-bold text-[#707070]">¡Qué pena!</p>
          <p className="text-2xl">Detestamos el 404,</p>
          <p className="text-2xl mb-4">pero a veces las cosas se rompen</p>
          <Image
            src="/404-pura-small.png"
            className="m-auto rounded-lg"
            width={200}
            height={200}
            alt="Error page"
            priority
          />
          <Link href={`/`} passHref>
            <div className="mt-4 cursor-pointer hover:text-[#00359f]">
              <FaShoePrints className="m-auto text-3xl mb-3" />
              <p className="text-xl">Todo fluye</p>
              <p className="text-xl">www.puramas.co</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
