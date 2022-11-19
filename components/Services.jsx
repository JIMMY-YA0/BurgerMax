import React from "react";
import styles from "../styles/Services.module.css";
import Image from "next/image";

const Services = () => {
  const servicesData = [
    {
      id: 0,
      img: "Delivery.png",
      title: "Delivery food",
      describe: "All food label halal and stay healthy for you",
    },
    {
      id: 1,
      img: "EasyToOrder.png",
      title: "Easy To Order",
      describe: "Only with your smartphone you can get a food",
    },
    {
      id: 2,
      img: "FastestDEL.png",
      title: "Fastest Delivery",
      describe: "We can deliver your food very fast",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <div>
          <h1 className={styles.h1}>- What we serve</h1>
          <h2 className={styles.h2}>Just sit back at home</h2>
          <h3 className={styles.h3}>
            we will <span>take care</span>
          </h3>
          <p className={styles.sologan}>
            All the features you want. Rations makes it easy to build and manage your food order.
          </p>
        </div>
        <div className={styles.imageContainer}>
          {servicesData.map((item) => (
            <div key={item.id} className={styles.wrapper}>
              <Image src={`/img/${item.img}`} alt="" width={160} height={146} />
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.describe}>{item.describe}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
