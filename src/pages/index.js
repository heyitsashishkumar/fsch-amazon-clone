import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto bg-gray-200">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <section>
          {products.length !== 0 && (
            <ProductFeed products={products} />
          )}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  const products = await fetch('https://fakestoreapi.com/products').then(
    res => res.json()
  );
  return {
    props: {
      products, session
    }
  }
}
