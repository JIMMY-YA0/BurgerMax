import axios from "axios";
import Head from "next/head";
import Featured from "../components/Featured";
import styles from "../styles/Home.module.css";
import Services from "../components/Services";
import Testimonial from "../components/Testimonial";

axios.defaults.baseURL = process.env.PROD_URL;
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BURGERMAX</title>
        <meta name="description" content="Taste the difference" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <Services />
      <Testimonial />
    </div>
  );
}
