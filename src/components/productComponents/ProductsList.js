import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const ProductsList = ({ products, users }) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Owner</th>
          <th>Category</th>
          <th>Price</th>
          <th>Units</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr key={product._id}>
              <td>
                <Link to={"/product/" + product._id} key={product._id}>
                  {product.name}
                </Link>
              </td>
              <td>{product.userName}</td>
              <td>{product.category}</td>
              <td>{product.price + "$"}</td>
              <td>{product.units}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ProductsList;
