import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/error";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Section3 = () => {
  const { data, isLoading, isError } = fetcher("api/popular");
  if (isLoading) return <Skeleton />;
  if (isError) return <Error />;
  return (
    <section className="container mx-auto md:px-20 py-16 px-3">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      <Swiper breakpoints={{
        768:{
          slidesPerView:2,
          spaceBetween:30
        }
      }}>
        {data.map((value, index) => (
          <SwiperSlide key={index}>
             <Post data={value} key={index}></Post>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

function Post({data}) {
  const { id, title, description, category, img, published, author } = data;
  return (
    <div className="grid">
      <div className="images">
        <Link href={`/posts/${id}`}>
          <Image src={img || "/"} width={600} height={400} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={`/posts/${id}`} className="text-orange-600 hover:text-orange-800">
            {category || <Skeleton />}
          </Link>
          <Link href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600">
            - {published || <Skeleton />}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-3xl md:text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            {title || "Title"}
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          {description || "No Description"}
        </p>
        {author ? <Author {...author}/> : <></>}
      </div>
    </div>
  );
}

export default Section3;
