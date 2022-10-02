import styles from "../styles/BurgerList.module.css";
import BurgerCard from "./BurgerCard";

const BurgerList = ({ burgerList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DELIGHT IN EVERY BITE</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu in pretium
        molestie. Interdum et malesuada fames acme. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {burgerList.map((burger) => (
          <BurgerCard key={burger._id} burger={burger} passHref />
        ))}
      </div>
    </div>
  );
};

export default BurgerList;
