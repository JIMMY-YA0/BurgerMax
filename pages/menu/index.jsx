import React from "react";
import axios from "axios";
import BurgerList from "../../components/BurgerList";
const Index = ({ burgerList }) => {
  return (
    <div>
      <BurgerList burgerList={burgerList} />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(`/api/products`);
  return {
    props: {
      burgerList: res.data,
    },
  };
};

export default Index;
