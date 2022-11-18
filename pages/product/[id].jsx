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
import { Add, ArrowBack } from "@mui/icons-material";
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
        <ArrowBack className={styles.back} />
      </Link>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={burger.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{burger.title}</h1>
        <span className={styles.price}>${(Math.round(price * 100) / 100).toFixed(2)}</span>
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
