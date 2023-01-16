import Head from "next/head";
import Image from "next/image";
import Layout from "../layout/Layout";
import Section1 from "../components/Section-1";
import Section2 from "../components/Section-2";
import Section3 from "../components/Section-3";
import Section4 from "../components/Section-4";

export default function Home() {
  return (
    <Layout>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </Layout>
  );
}
