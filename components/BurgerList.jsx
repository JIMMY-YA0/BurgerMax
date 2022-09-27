import styles from "../styles/BurgerList.module.css";
import BurgerCard from "./BurgerCard";

const BurgerList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DELIGHT IN EVERY BITE</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu in pretium
        molestie. Interdum et malesuada fames acme. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        <BurgerCard />
        <BurgerCard />
        <BurgerCard />
        <BurgerCard />
        <BurgerCard />
      </div>
    </div>
  );
};

export default BurgerList;
