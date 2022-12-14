import styles from "../styles/Cart.module.css";
import Image from "next/image";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import axios from "axios";
import { reset } from "../redux/cartSlice";
import { useRouter } from "next/router";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = (Math.round(cart.total * 100) / 100).toFixed(2);
  const currency = "AUD";
  const style = { layout: "vertical", size: "responsive", label: "checkout" };
  const createOrder = async (data) => {
    try {
      const res = await axios.post(`/api/orders`, data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                orderDetails: cart.products,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th></th>
              <th>Product</th>
              <th>Size</th>
              <th>Meal options</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody className={styles.tbody}>
            {cart.products.map((product, index) => (
              <tr className={styles.tr} key={index}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image src={product.img} layout="fill" objectFit="cover" alt="" />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span>
                    {product.size === 0 ? "Small" : product.size === 1 ? "Medium" : "Large"}
                  </span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.length !== 0
                      ? product.extras.map((extra) => <span key={extra._id}>{extra.text}; </span>)
                      : "Nil"}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>
                    ${(Math.round(product.price * 100) / 100).toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${(Math.round(product.price * product.quantity * 100) / 100).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <h2>Cart Summary</h2>
            <IconButton aria-label="delete" onClick={() => dispatch(reset())}>
              <DeleteSweepOutlinedIcon fontSize="small" />
            </IconButton>
          </div>

          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> $
            {(Math.round(cart.total * 100) / 100).toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Delivery fee:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$
            {(Math.round(cart.total * 100) / 100).toFixed(2)}
          </div>
          {
            <div className={styles.paymentMethods}>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "Ab0ZnwkX9gk76_u-OwVPLM2PG3bfYlSU8J-7FQyD0-O7qHQBItnCg0WD7RUf1bz2BqBSms-itpKsGf2y",
                  components: "buttons",
                  currency: "AUD",
                  // "disable-funding": "credit,card",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
