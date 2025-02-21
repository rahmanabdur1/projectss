import Image from "next/image";
import Link from "next/link";
import React from "react";
import MostPopular from "./MostPopular";
import PopularPost from "./PopularPost";

const LeftSideBar = () => {
  return (
    <div className="pt-10" id="left_side_wrapper">
      <div className="mb-6">
        <Link
          href={`https://youtube.puramas.co/`}
          target="_blank"
        >
          <p className="p-1 shadow-lg">
            <Image
              src={`/youtube_ads.jpg`}
              width={305}
              height={400}
              alt="youtube banner"
              priority
            />
          </p>
        </Link>
      </div>
      <MostPopular />
      <div className="mb-6">
        <Link
          href={`https://facebook.puramas.co/`}
          target="_blank"
        >
          <div className="p-1 shadow-lg">
            <Image
              src={`/facebook_ads.jpg`}
              width={305}
              height={400}
              alt="facebook banner"
              priority
            />
          </div>
        </Link>
      </div>
      <PopularPost />
      <div className="mb-6">
        <Link
          href={`https://instagram.puramas.co/`}
          target="_blank"
        >
          <div className="p-1 shadow-lg">
            <Image
              src={`/instagram_ads.jpg`}
              width={305}
              height={400}
              alt="instagram banner"
            />
          </div>
        </Link>
      </div>
      <div className="mb-6">
        <Link
          href={`http://creativecommons.org/licenses/by-nc-sa/4.0/`}
          target="_blank"
        >
          <div className="p-1 py-3 shadow-lg">
            <Image
              src={`/wikipedia_ads.png`}
              width={88}
              height={31}
              alt="wikipedia banner"
              className="m-auto wiki_img"
            />
            <p className="text-[9px] text-black text-center">
              Este obra está bajo una licencia de Creative Commons
              Reconocimiento- NoComercial-CompartirIgual 4.0 Internacional.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;
