import React from "react";

import Card from "../common/UIElements/Card";
import Button from "../common/FormElements/Button";
import AllProductsItem from "./AllProductsItem";
import "./productsCss/AllProductsList.css";

const AllProductsList = (props) => {
  const users = props.users;
  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No Products Found. Maybe add one?</h2>
          <Button to="/product/new">Add Product</Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="products-list__table">
      <Card>
        <table>
          <thead>
            <tr>
              <th />
              <th>Product Name</th>
              <th>Owner</th>
              <th>Category</th>
              <th>Price</th>
              <th>Units</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.items.map((product) => {
              return (
                <AllProductsItem
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  creatorId={users.map((user) =>
                    user.id === product.creator
                      ? user.firstName + " " + user.lastName
                      : null
                  )}
                  category={product.category}
                  price={product.price}
                  units={product.units}
                  description={product.description}
                />
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AllProductsList;
