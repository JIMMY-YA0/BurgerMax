import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/LOGO.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. <br /> BURGERMAX, <br /> MAKING YOUR DREAM BURGER COME TRUE.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            1 Delhi Road, North Ryde
            <br /> Sydney, 2113
            <br /> (61) 042 424 391 121
          </p>
          <p className={styles.text}>
            2 Delhi Road, North Ryde
            <br /> Sydney, 2113
            <br /> (61) 042 424 391 121
          </p>
          <p className={styles.text}>
            3 Delhi Road, North Ryde
            <br /> Sydney, 2113
            <br /> (61) 042 424 391 121
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 11:00 – 18:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
