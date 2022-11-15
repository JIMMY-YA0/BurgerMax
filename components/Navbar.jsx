import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import Link from "next/link";
import { style } from "@mui/system";
import { PhoneInTalkOutlined } from "@mui/icons-material";
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div>
          <PhoneInTalkOutlined fontSize="large" style={{ color: "#fff" }} />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>0424391121</div>
        </div>
      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Home</li>
          </Link>

          <li className={styles.listItem}>
            <Link href="../#menu">Menu</Link>
          </li>
          <li className={styles.logo}>
            <Image src="/img/LOGO.png" alt="" width="100px" height="100px" />
          </li>

          <li className={styles.listItem}>About Us</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>

      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <ShoppingCartOutlinedIcon fontSize="large" style={{ color: "#fff" }} />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
