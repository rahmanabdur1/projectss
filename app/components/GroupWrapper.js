"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TitleWrapper from "./TitleWrapper";
import GroupCard from "./GroupCard";
import { useData } from "../service/Provider";

const GroupWrapper = () => {

  const fadeInVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
  };


  const data = useData();
  const companyData = useMemo(() => data, [data]);

  return (
    <section className="py-8" id="empresa">
      <div className="container m-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={fadeInVariants}
        >
          <TitleWrapper
            title={companyData?.companySec[0]?.title_text}
            firstLine={companyData?.companySec[0]?.text_desc}
          />
        </motion.div>

        <motion.div
          className="group_wrapper gap-6 grid grid-cols-1 lg:grid-cols-2 mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }} 
          variants={fadeInVariants}
        >
          {companyData?.companyIcon?.map((elem, index) => (
            <motion.div
              key={index}
              variants={fadeInVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GroupCard
                icon={elem.icon_name}
                text={elem.icon_title}
                desc={elem.icon_desc}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GroupWrapper;
