import React from "react";
import axios from "axios";
import BurgerList from "../../components/BurgerList";

axios.defaults.baseURL = process.env.PROD_URL;
const Index = ({ burgerList }) => {
  return (
    <div>
      <BurgerList burgerList={burgerList} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(`/api/products`);
  return {
    props: {
      burgerList: res.data,
    },
  };
};

export default Index;
