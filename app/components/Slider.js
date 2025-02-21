

"use client";
import TitleWrapper from "./TitleWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useData } from "../service/Provider";

const Slider = () => {
  const data = useData();

  if (!data?.categorySec || !data?.categoryImg) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <section className="pt-5 pb-8">
      <div className="container m-auto">
        <TitleWrapper
          title={data.categorySec[0]?.title_text}
          firstLine={data.categorySec[0]?.desc_text}
        />

        <div className="slider_wrapper mt-8 relative">
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            loop={true}
            centeredSlides={true}
            freeMode={true}
            navigation={true} 
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3.8,
                spaceBetween: 5,
              },
            }}
          >
            {data.categoryImg.map((elem) => (
              <SwiperSlide key={elem.ci_id}>
                <Link href={elem.c_link} target="_blank">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${elem.c_img}`}
                    width={264}
                    height={325}
                    className="m-auto rounded-lg shadow-md"
                    alt={elem.c_title || "Slide image"} 
                    loading="lazy"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

      
          <div className="swiper-button-prev absolute left-0 text-white" />
          <div className="swiper-button-next absolute right-0 text-white" />
        </div>
      </div>
    </section>
  );
};

export default Slider;
