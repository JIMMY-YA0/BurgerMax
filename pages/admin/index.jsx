import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Add from "../../components/Add";
import AddButton from "../../components/AddButton";
import styles from "../../styles/Admin.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Index = ({ orders, products }) => {
  const [burgerList, setBurgerList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["Preparing", "On the way", "Delivered"];
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/products/" + id); //jiuzheyang
      toast.warn("Food has been uccessfully deleted！", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setBurgerList(burgerList.filter((burger) => burger._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    console.log(item);
    const currentStatus = item.status;

    try {
      if (currentStatus < 2) {
        const res = await axios.put("http://localhost:3000/api/orders/" + id, {
          status: currentStatus + 1,
        });
        setOrderList([res.data, ...orderList.filter((order) => order._id !== id)]);
      } else {
        const res = await axios.put("http://localhost:3000/api/orders/" + id, {
          status: 0,
        });
        setOrderList([res.data, ...orderList.filter((order) => order._id !== id)]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      {/* Products List */}
      <div className={styles.item}>
        <div className={styles.productList}>
          <h1>Products List</h1>
          {<AddButton setClose={setClose} />}
          {!close && <Add setClose={setClose} />}
        </div>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Product ID</th>
              <th>Title</th>
              <th>Price(s-m-l)</th>
              <th>Action</th>
            </tr>
          </tbody>
          {burgerList
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((product) => (
              <tbody key={product._id}>
                <tr>
                  <td>
                    <Image src={product.img} width={50} height={50} objectFit="cover" alt="" />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.title}</td>
                  <td>
                    ${product.prices[0]}-${product.prices[1]}-${product.prices[2]}
                  </td>
                  <td>
                    <button className={styles.button}>Edit</button>
                    <button className={styles.button} onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>

      {/* orderList */}
      <div className={styles.item}>
        <h1>Orders List</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Order Details</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td>{order._id}</td>
                  <td>{order.customer}</td>
                  <td>
                    {order.orderDetails.map((item) => (
                      <span key={item._id}>
                        {item.quantity} X {item.title}(
                        {item.size === 0 ? "S" : item.size === 1 ? "M" : "L"}) Options:{" "}
                        {item.extraOptions.map((item) => item.text + " ")}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td>${order.total}</td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button onClick={() => handleStatus(order._id)}>Next Stage</button>
                    <ToastContainer
                      position="bottom-center"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
