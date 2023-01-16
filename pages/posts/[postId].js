import Author from "../../components/_child/Author";
import Layout from "../../layout/Layout";
import Image from "next/image";
import Related from "../../components/_child/Related";
import getPost from "../../lib/helper";
import fetcher from "../../lib/fetcher";
import Spinner from "../../components/_child/Spinner";
import Error from "../../components/_child/error";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page({ fallback }) {
  const router = useRouter();
  const { postId } = router.query;
  const { data, isLoading, isError } = fetcher(`api/posts/${postId}`);

  if (isLoading) return <Skeleton />;
  if (isError) return <Error />;

  return (
    <SWRConfig value={{ fallback }}>
      <Article {...data} />
    </SWRConfig>
  );
}

function Article({ id, title, subtitle, description, img, author }) {
  return (
    <Layout>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          {author ? <Author {...author} /> : <></>}
        </div>
        <div className="post py-10">
          <h1 className="font-bold text-center text-4xl pb-5">
            {title || "Title"}
          </h1>
          <p className="text-gray-500 text-center text-xl">
            {subtitle || "Subtitle"}
          </p>
          <div className="py-10">
            <Image
              src={img || <Skeleton height={600} />}
              width={900}
              height={600}
            />
          </div>
          <div className="content text-gray-600 flex flex-col text-lg gap-4">
            {description || <Skeleton count={4} />}
          </div>
        </div>
        <Related />
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const posts = await getPost(params.postId);

  return {
    props: {
      fallback: {
        "/api/posts": posts,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPost();

  const paths = posts.map((value) => {
    return {
      params: {
        postId: value.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
