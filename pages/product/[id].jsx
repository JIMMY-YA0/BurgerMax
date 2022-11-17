import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { orange } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
    if (quantity > 0 && quantity < 100 && quantity % 1 === 0) {
      dispatch(addProduct({ ...burger, extras, price, quantity, size }));
      toast.success("Item is added to your cart!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Invalid Quantity!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <div className={styles.container}>
      <Link href="../#menu" passHref>
        <svg
          className={styles.back}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
        >
          <path d="m12.017 1.995c5.517 0 9.997 4.48 9.997 9.998s-4.48 9.998-9.997 9.998c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.498-8.497-8.498zm-1.528 4.715s-1.502 1.505-3.255 3.259c-.147.147-.22.339-.22.531s.073.383.22.53c1.753 1.754 3.254 3.258 3.254 3.258.145.145.335.217.526.217.192-.001.384-.074.531-.221.292-.293.294-.766.003-1.057l-1.977-1.977h6.693c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.693l1.978-1.979c.29-.289.287-.762-.006-1.054-.147-.147-.339-.221-.53-.222-.19 0-.38.071-.524.215z" />
        </svg>
      </Link>
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
            <span className={styles.smallSize}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            {sizeSelected && size == 1 ? (
              <Image src="/img/size-selected.png" layout="fill" alt="" />
            ) : (
              <Image src="/img/size.png" layout="fill" alt="" />
            )}

            <span className={styles.mediumSize}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            {sizeSelected && size == 2 ? (
              <Image src="/img/size-selected.png" layout="fill" alt="" />
            ) : (
              <Image src="/img/size.png" layout="fill" alt="" />
            )}
            <span className={styles.largeSize}>Large</span>
          </div>
        </div>

        <h3>Meal options</h3>
        <div className={styles.ingredients}>
          {burger.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              {/* <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handlechange(e, option)}
              /> */}
              {/* <label htmlFor="double">{option.text}</label> */}
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: orange[300],
                      "&.Mui-checked": {
                        color: orange[500],
                      },
                    }}
                  />
                }
                label={option.text}
                onChange={(e) => handlechange(e, option)}
              />
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <TextField
            size="small"
            color="success"
            sx={{ width: 80 }}
            onChange={(e) => setQuantity(e.target.value)}
            id="outlined-number"
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            // placeholder={"[1-100]"}
            defaultValue={1}
            inputProps={{ inputMode: "numeric", min: 1, max: 99, pattern: "[1-99]*" }}
            // InputProps={{ inputProps: { min: 0, max: 99 } }}
          />
          {/* <button className={styles.button} onClick={handleClick}>
            Add to order
          </button> */}
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            sx={{ m: 1 }}
            className={styles.button}
            onClick={handleClick}
          >
            Add to order
          </Button>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`/api/products/${params.id}`);
  return {
    props: {
      burger: res.data,
    },
  };
};

export default Product;
