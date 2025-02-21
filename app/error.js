"use client";

import Image from "next/image";
import Header from "./components/Header";
import Link from "next/link";
import { FaShoePrints } from "react-icons/fa";

const Error = () => {
  return (
    <>
      <Header />
      <div className="text-center flex items-center justify-center h-screen">
        <div>
          <p className="text-3xl font-bold text-[#707070]">¡Qué pena!</p>
          <p className="text-2xl">Detestamos el 404,</p>
          <p className="text-2xl">pero a veces las cosas se rompen</p>
          <Image
            src={`/404-pura-small.png`}
            className="m-auto"
            width={200}
            height={200}
            alt="error page"
          />
          <Link href={`/`}>
              <FaShoePrints className="m-auto text-3xl my-3 whatsapp_icon_social" />
            <p className="text-xl">Todo fluye</p>
            <p className="text-xl">www.puramas.co</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
