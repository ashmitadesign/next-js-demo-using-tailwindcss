import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/error";

const Section4 = () => {
  const { data, isLoading, isError } = fetcher("api/trending");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section className="container mx-auto md:px-20 py-16 px-3">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Business</h1>
          <div className="flex flex-col gap-6">
            {data[1] ? <Post data={data[1]} /> : <></>}
            {data[2] ? <Post data={data[2]} /> : <></>}
            {data[3] ? <Post data={data[3]} /> : <></>}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Travel</h1>
          <div className="flex flex-col gap-6">
            {data[4] ? <Post data={data[4]} /> : <></>}
            {data[5] ? <Post data={data[5]} /> : <></>}
            {data[2] ? <Post data={data[2]} /> : <></>}
          </div>
        </div>
      </div>
    </section>
  );
};

function Post({data}) {
  const { id, title, category, img, published, author } = data;
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/posts/${id}`}>
          <Image
            src={img || "/"}
            className="rounded"
            width={300}
            height={250}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/posts/${id}`} className="text-orange-600 hover:text-orange-800">
            {category || "Unknown"}
          </Link>
          <Link href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600">
            - {published || "Unknown"}
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
        {author ? <Author {...author}/> : <></>}
      </div>
    </div>
  );
}

export default Section4;
