"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TitleWrapper from "./TitleWrapper";
import Link from "next/link";
import IconRenderer from "../utils/IconRenderer";
import { useData } from "../service/Provider";

const fadeInVariants = {
  hidden: { opacity: 0, y: 150 },
  visible: { opacity: 1, y: 0 },
};

const PlaceLoc = () => {
  const data = useData();
  const shopIcons = useMemo(() => data?.shopSecIcon || [], [data]);

  return (
    <section className="py-8 bg-gray-100">
      <div className="container m-auto">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeInVariants}
        >
          <TitleWrapper
            title={data?.shopSec?.[0]?.title_text}
            firstLine={data?.shopSec?.[0]?.text_desc}
          />
        </motion.div>

        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-6">
          {shopIcons.map((elem, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              variants={fadeInVariants}
              className="text-center"
            >
              <div className="bg-[#00359f] shadow-xl mx-auto mb-4 rounded-full w-[80px] h-[80px] flex items-center justify-center text-5xl text-white hover:bg-[#ffd966] transition-all duration-150">
                <Link href={elem.icon_link} target="_blank">
                  <IconRenderer iconName={elem.icon_name} size={40} />
                </Link>
              </div>
              <p className="font-medium">{elem.icon_title}</p>
              <p className="text-sm">{elem.icon_desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlaceLoc;
