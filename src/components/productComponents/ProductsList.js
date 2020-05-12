import React from "react";
import { Table } from "reactstrap";
import ProductItem from "./ProductItem";

const ProductsList = ({ products, onDeleteProduct }) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Owner</th>
          <th>Category</th>
          <th>Price</th>
          <th>Units</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            name={product.name}
            userName={product.userName}
            category={product.category}
            price={product.price + "$"}
            units={product.units}
            onClick={() => onDeleteProduct(product._id)}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default ProductsList;
