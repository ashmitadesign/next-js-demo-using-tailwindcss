import React, { useLayoutEffect, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";
import Author from "./_child/Author";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/error";
import Skeleton from "react-loading-skeleton";
import { gsap } from "gsap";
import "react-loading-skeleton/dist/skeleton.css";

const Section1 = () => {
  SwiperCore.use([Autoplay]);
  const bg = {
    background: 'url("/images/banner.png") no-repeat',
    backgroundPosition: "right",
  };

  const { data, isLoading, isError } = fetcher("api/trending");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20 px-3">
        <h1 className="font-bold text-center text-4xl pb-12">Trending</h1>
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
        >
          {!data?.length &&
            new Array(5).fill().map(() => <Skeleton count={5} height={600} />)}
          {data.map((value, index) => (
            <SwiperSlide key={index}>
              <Slide data={value} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

function Slide({ data }) {
  const { id, title, description, category, img, published, author } = data;
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".box",
        { opacity: 0 },
        { opacity: 1, ease: "Expo.easeInOut", duration: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="image">
        <Link href={`/posts/${id}`}>
          <Image src={img || "/"} width={600} height={600} className="box" />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link
            href={`/posts/${id}`}
            className="text-orange-600 hover:text-orange-800"
          >
            {/* {category || "Unknown"} */}
            {category || <Skeleton />}
          </Link>
          <Link
            href={`/posts/${id}`}
            className="text-gray-800 hover:text-gray-600"
          >
            - {published || "Unknown"}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-xl lg:text-3xl font-bold text-gray-800 hover:text-gray-600"
          >
            {title || "Title"}
          </Link>
          <p className="text-gray-500 py-3">
            {description || "No Description"}
          </p>
          {author ? <Author {...author} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Section1;
