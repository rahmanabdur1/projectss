import React, { useMemo } from "react";
import TitleWrapper from "./TitleWrapper";
import PromoCard from "./PromoCard";
import { useData } from "../service/Provider";

const Promo = () => {
  const data = useData();

  const productSection = useMemo(() => data?.productSec?.[0] || {}, [data]);
  const productImages = useMemo(() => data?.productImg || [], [data]);

  return (
    <section className="py-8" id="shop">
      <div className="container m-auto">
        <TitleWrapper title={productSection?.title_text} firstLine={productSection?.desc_text} />

        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8">
          {productImages.map((elem) => (
            <PromoCard
              key={elem.id || elem.product_img} 
              totalCards={productImages.length}
              image={elem.product_img}
              link={elem.product_link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


export default React.memo(Promo);
