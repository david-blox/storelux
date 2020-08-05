import React from "react";

import "./usersCss/UserShoppingCartList.css";
import UserShoppingCartProducts from "../shoppingCartComponents/ShoppingCartProducts";

// const DUMMY_CART = [
//   {
//     id: "p1",
//     title: "smart watch",
//     category: " watches",
//     price: 199.99,
//     units: 10,
//     description: "new smart watch",
//     image:
//       "https://ae01.alicdn.com/kf/Ha0ab8f1ce1ef4b348445821cad269f2bn/2020-Steel-Smartwatch-Women-Waterproof-Smart-Watch-Men-T80-Bluetooth-Heart-Rate-Monitor-Fitness-Tracker-For.jpg",
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "smart watch",
//     category: " watches",
//     price: 50,
//     units: 12,
//     description: "new smart watch",
//     image:
//       "https://ae01.alicdn.com/kf/Ha0ab8f1ce1ef4b348445821cad269f2bn/2020-Steel-Smartwatch-Women-Waterproof-Smart-Watch-Men-T80-Bluetooth-Heart-Rate-Monitor-Fitness-Tracker-For.jpg",
//     creator: "u1",
//   },
//   {
//     id: "p3",
//     title: "smart watch",
//     category: " watches",
//     price: 20.99,
//     units: 5,
//     description: "new smart watch",
//     image:
//       "https://ae01.alicdn.com/kf/Ha0ab8f1ce1ef4b348445821cad269f2bn/2020-Steel-Smartwatch-Women-Waterproof-Smart-Watch-Men-T80-Bluetooth-Heart-Rate-Monitor-Fitness-Tracker-For.jpg",
//     creator: "u1",
//   },
// ];

const UserShoppingCartList = () => {
  return (
    <div className="user-cart__wrapper">
      <UserShoppingCartProducts />
    </div>
  );
};

export default UserShoppingCartList;
