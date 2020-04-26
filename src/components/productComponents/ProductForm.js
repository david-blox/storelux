import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const ProductForm = ({
  product,
  users,
  categories,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{product._id ? "Edit" : "Add"} Product</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        type="text"
        name="name"
        label="Name"
        value={product.name}
        onChange={onChange}
        error={errors.name}
      />

      <SelectInput
        name="userId"
        label="Owner"
        value={product.userId || ""}
        defaultOption="Select Owner"
        options={users.map((user) => ({
          value: user.id,
          text: user.firstName + " " + user.lastName,
        }))}
        onChange={onChange}
        error={errors.author}
      />

      <SelectInput
        name="category"
        label="Category"
        value={product.category || ""}
        defaultOption="Select Category"
        options={categories.map((category) => ({
          value: category.name,
          text: category.name,
        }))}
        onChange={onChange}
        error={errors.author}
      />
      <TextInput
        type="number"
        name="price"
        label="Price"
        value={product.price}
        onChange={onChange}
        error={errors.price}
      />
      <TextInput
        type="number"
        name="units"
        label="Units"
        value={product.units}
        onChange={onChange}
        error={errors.units}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ProductForm;
