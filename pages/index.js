import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import BurgerList from "../components/BurgerList";
import styles from "../styles/Home.module.css";

axios.defaults.baseURL = process.env.PROD_URL;

export default function Home({ burgerList, admin }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>BURGERMAX</title>
        <meta name="description" content="Taste the difference" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <BurgerList burgerList={burgerList} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(`/api/products`);
  return {
    props: {
      burgerList: res.data,
      admin,
    },
  };
};
