import Image from "next/image";
import styles from "../styles/BurgerCard.module.css";
import Link from "next/link";

const BurgerCard = ({ burger }) => {
  return (
    <Link href={`/product/${burger._id}`}>
      <div className={styles.container}>
        <Image
          src={burger.img}
          alt={burger.title}
          width={400}
          height={400}
          loading="lazy"
          className={styles.image}
        />
        <div className={styles.wrapper}>
          <p className={styles.title}>{burger.title}</p>
          <p className={styles.price}>
            <span className={styles.dollar}>$</span>
            {burger.prices[0]}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BurgerCard;
