import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "../styles/Testimonial.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const reviewData = [
    {
      id: 0,
      name: "Jimmy Yao",
      avatar: "ava01.jpg",
      comment:
        "1Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis atque, quam minus totam maiores laborum! Impedit consectetur illum aliquid odit. Odit dolore ipsum quod debitis!",
    },
    {
      id: 1,
      name: "Elena Muller",
      avatar: "ava02.jpg",
      comment:
        "1Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis atque, quam minus totam maiores laborum! Impedit consectetur illum aliquid odit. Odit dolore ipsum quod debitis!",
    },
    {
      id: 2,
      name: "John Gehlert",
      avatar: "ava03.jpg",
      comment:
        "1Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis atque, quam minus totam maiores laborum! Impedit consectetur illum aliquid odit. Odit dolore ipsum quod debitis!",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.ClientImg}>
          <Image src="/img/client.png" width={470} height={504} alt="" />
        </div>
        <div className={styles.headlineContainer}>
          <div className={styles.headline}>
            <p className={styles.underline}>__</p>
            <h2>What our clients </h2>
            <h2>say about us.</h2>
          </div>

          <Slider {...settings} className={styles.slider}>
            {reviewData.map((item) => (
              <div key={item.id}>
                <p className={styles.comments}>{item.comment}</p>
                <div className={styles.avatarCotainer}>
                  <Image
                    src={`/img/${item.avatar}`}
                    className={styles.avatar}
                    alt=""
                    width={53}
                    height={53}
                  />
                  <h6>{item.name}</h6>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
