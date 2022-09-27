import Image from "next/image";
import styles from "../styles/BurgerCard.module.css";

const BurgerCard = () => {
  return (
    <div className={styles.container}>
      <Image src="/img/Burger.png" alt="" width="500" height="500" />
      <h1 className={styles.title}>Burger King</h1>
      <span className={styles.price}>$9.90</span>
      <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
};

export default BurgerCard;
