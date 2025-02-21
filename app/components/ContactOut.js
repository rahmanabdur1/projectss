"use client";
import { FaBasketShopping } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
const ContactOut = () => {
  return (
    <div className="flex flex-col gap-1 fixed bottom-5 left-2">
      <Link href={`https://shop.puramas.co/`} target="_blank">
        <span className="bg-[#00359f] shadow-xl cursor-pointer w-[50px] h-[50px] p-[10px] flex items-center justify-center rounded-lg">
          <FaBasketShopping className="text-white text-3xl" />
        </span>
      </Link>
      <Link href={`https://bio.site/puramas.contact`} target="_blank">
        <span className="bg-[#25d366] shadow-xl cursor-pointer w-[50px] h-[50px] p-[10px] flex items-center justify-center rounded-lg">
          <FaWhatsapp className="text-white text-3xl" />
        </span>
      </Link>
    </div>
  );
};

export default ContactOut;
