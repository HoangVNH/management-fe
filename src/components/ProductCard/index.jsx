import { Button, Card } from "antd";
import React from "react";

import Utils from "../UIKit/Utils";
import "./styles.scss";
import PropTypes from "prop-types";

// const ProductCard = ({
//   id,
//   smallImage,
//   name,
//   price,
//   discount,
//   className,
//   style,
//   onAddToCart,
// }) => {
//   return (
//     <Card
//       hoverable
//       className={`product-card__wrapper ${className}`}
//       style={style}
//     >
//       <div className="product-card__image">
//         {discount ? <Tag color="warning">{discount}%</Tag> : null}
//         <ImageWithFallBack src={smallImage} alt={name} />
//       </div>
//       <Tooltip title={name}>
//         <p className="product-card__name">{name}</p>
//       </Tooltip>
//       <div className="product-card__price">
//         <Link to={`/product/${id}`}>
//           <div className="product-card__price--left">
//             <span className="product-card__net-price">
//               {Utils.Money({ money: price })}
//             </span>
//           </div>
//         </Link>
//         <Button className="product-card__button" onClick={onAddToCart}>
//           Thêm vào giỏ
//         </Button>
//       </div>
//     </Card>
//   );
// };

const ProductCard = ({ id, name, price, className, style, onClick }) => {
  return (
    <Card
      hoverable
      className={`product-card__wrapper ${className}`}
      style={style}
    >
      <p className="product-card__name">{name}</p>
      <div className="product-card__price">
        <div className="product-card__price--left">
          <span className="product-card__net-price">
            {Utils.Money({ price })}
          </span>
        </div>
        <Button
          className="product-card__button"
          onClick={() => {
            onClick({ id, name, price });
          }}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  onClick: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  className: "",
  style: {},
};

export default ProductCard;
