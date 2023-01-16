import React, { useLayoutEffect, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/error";
import Skeleton from "react-loading-skeleton";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "react-loading-skeleton/dist/skeleton.css";

const Section2 = () => {
  const { data, isLoading, isError } = fetcher("api/posts");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  gsap.registerPlugin(ScrollTrigger);
  

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    let para = element.querySelector(".first-para");
    gsap.fromTo(
      para,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: element.querySelector(".section2"),
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-10 px-3 section2">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {data.map((value, index) => (
          <Post data={value} key={index}></Post>
        ))}
      </div>
    </section>
  );
};

function Post({ data }) {
  const { id, title, subtitle, category, img, published, author } = data;
  // const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

  // useIsomorphicLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.fromTo(
  //       ".box",
  //       { opacity: 0 },
  //       { opacity: 1, ease: "Expo.easeInOut", duration: 0.3 }
  //     );
  //   });
  //   return () => ctx.revert();
  // }, []);
  return (
    <div className="item">
      {/* <Skeleton count={3}> */}
      <div className="images">
        <Link href={`/posts/${id}`}>
          <Image src={img} className="rounded box" width={500} height={350} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link
            href={`/posts/${id}`}
            className="text-orange-600 hover:text-orange-800 first-para"
          >
            {category}
          </Link>
          <Link
            href={`/posts/${id}`}
            className="text-gray-800 hover:text-gray-600"
          >
            - {published}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            {title || "Title"}
          </Link>
        </div>
        <p className="text-gray-500 py-3">{subtitle || "Subtitle"}</p>
        {author ? <Author {...author} /> : <></>}
      </div>
      {/* </Skeleton> */}
    </div>
  );
}

export default Section2;
