import Image from "next/image";
import styles from "../styles/BurgerCard.module.css";
import Link from "next/link";

const BurgerCard = ({ burger }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${burger._id}`}>
        <Image src={burger.img} alt="" width="200%" height="200%" className={styles.image} />
      </Link>
      <div className={styles.wrapper}>
        <p className={styles.title}>{burger.title}</p>
        <p className={styles.price}>
          <span className={styles.dollar}>$</span>
          {burger.prices[0]}
        </p>
      </div>
    </div>
  );
};

export default BurgerCard;
