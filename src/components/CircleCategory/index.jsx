import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.scss";
import ImageWithFallBack from "components/ImageWithFallback";

const CircleCategory = ({ id, name, image }) => {
  return (
    <Link
      to={`/category/${id}`}
      className="link--normalize category-item__wrapper"
    >
      <div className="category-item__icon">
        <ImageWithFallBack src={image || ""} alt={name} />
      </div>
      <div className="category-item__label">{name}</div>
    </Link>
  );
};

CircleCategory.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
};

CircleCategory.defaultProps = {
  id: "",
  name: "",
  image: "",
};

export default CircleCategory;
