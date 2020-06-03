import React from "react";

import Card from "../common/UIElements/Card";
import ProductItem from "./ProductItem";
import Button from "../common/FormElements/Button";
import "./productsCss/ProductList.css";

const ProductsList = (props) => {
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
    <ul className="product-list">
      {props.items.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          creatorId={product.creator}
          category={product.category}
          price={product.price}
          units={product.units}
          description={product.description}
          onDelete={props.onDeleteProduct}
        />
      ))}
    </ul>
  );
};

export default ProductsList;
