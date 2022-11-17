import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  const status = order.status;
  console.log("order:", order);
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  console.log(order.orderDetails);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <table className={styles.table}>
          <thead>
            {" "}
            <tr className={styles.trTitle}>
              <th>Order ID</th>
              <th className={styles.test}>Items</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Paid</th>
            </tr>
          </thead>

          <tbody>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order._id}</span>
              </td>
              <td className={styles.item}>
                {order.orderDetails.map((item) => (
                  <span key={order._id}>
                    {item.quantity} X {item.title}(
                    {item.size === 0 ? "S" : item.size === 1 ? "M" : "L"})
                    {item.extras.length > 0
                      ? " Extras: " + item.extras.map((item) => item.text + " ")
                      : ""}
                    <br />
                  </span>
                ))}
              </td>
              <td>
                <span className={styles.name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{order.address}</span>
              </td>
              <td>
                <span className={styles.total}>${order.total}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.status}>
        <div className={statusClass(0)}>
          <Image src="/img/paid.png" width={30} height={30} alt="" />
          <span>Payment</span>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(1)}>
          <Image src="/img/bake.png" width={30} height={30} alt="" />
          <span>Preparing</span>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(2)}>
          <Image src="/img/bike.png" width={30} height={30} alt="" />
          <span>On the way</span>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(3)}>
          <Image src="/img/delivered.png" width={30} height={30} alt="" />
          <span>Delivered</span>
          <div className={styles.checkedIcon}>
            <Image
              className={styles.checkedIcon}
              src="/img/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;
