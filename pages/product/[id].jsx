import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ burger }) => {
  const [price, setPrice] = useState(burger.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(true);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };
  const handleSize = (sizeIndex) => {
    const difference = burger.prices[sizeIndex] - burger.prices[size];
    setSize(sizeIndex);
    setSizeSelected(true);
    changePrice(difference);
  };

  const handlechange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };
  const handleClick = () => {
    dispatch(addProduct({ ...burger, extras, price, quantity, size }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={burger.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{burger.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{burger.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            {sizeSelected && size == 0 ? (
              <Image src="/img/size-selected.png" layout="fill" alt="" />
            ) : (
              <Image src="/img/size.png" layout="fill" alt="" />
            )}
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            {sizeSelected && size == 1 ? (
              <Image src="/img/size-selected.png" layout="fill" alt="" />
            ) : (
              <Image src="/img/size.png" layout="fill" alt="" />
            )}

            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            {sizeSelected && size == 2 ? (
              <Image src="/img/size-selected.png" layout="fill" alt="" />
            ) : (
              <Image src="/img/size.png" layout="fill" alt="" />
            )}
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Meal options</h3>
        <div className={styles.ingredients}>
          {burger.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handlechange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            min="1"
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to order
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      burger: res.data,
    },
  };
};

export default Product;
