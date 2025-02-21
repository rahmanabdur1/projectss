import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useData } from "../service/Provider";

const Catalog = () => {
  const renderText = (text) => {
    if (!text) return null;
    return text.split(/<br\s*\/?>/).map((line, index) => (
      <div key={index}>
        {line}
      </div>
    ));
  };
  const data = useData()
  return (
    <section id="catalog" className="py-8">
      <div className="container m-auto text-center text-white">
        <h2 className="text-4xl mb-4">{data?.catalog[0]?.title_text}</h2>
        <span className="font-light text-sm">
          {renderText(data?.catalog[0]?.text_desc)}
        </span>
        <Link href={`https://catalogo.puramas.co/`} target="_blank">
          <Image
            src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${data?.catalog[0]?.catalog_img}`}
            alt="Catalog Photo"
            width={400}
            height={283}
            className="m-auto mt-7"
          />
        </Link>
      </div>
    </section>
  );
};

export default Catalog;
