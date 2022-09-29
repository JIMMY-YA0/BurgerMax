import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>0424391121</div>
        </div>
      </div>
      <div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href="/" passHref>
              <li className={styles.listItem}>Home</li>
            </Link>
            <li className={styles.listItem}>Location</li>
            <li className={styles.listItem}>Menu</li>
            <Image src="/img/LOGO.png" alt="" width="160px" height="160px" />
            <li className={styles.listItem}>Event</li>
            <li className={styles.listItem}>About Us</li>
            <li className={styles.listItem}>Contact</li>
          </ul>
        </div>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>3</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
