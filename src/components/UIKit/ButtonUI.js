import { Button } from "antd";
import PropTypes from "prop-types";
import "./style.scss";

const ButtonUI = (props) => {
  const variant = props.variant ? props.variant : "primary";
  let type = props.type ? props.type : "primary";
  const text = props.text ? props.text : null;
  const normal = props.normal ? props.normal : false; //Button default
  const block = props.block ? props.block : false;
  const disabled = props.disabled ? props.disabled : false;
  // const href = props.href ? props.href : null
  const size = props.size ? props.size : "middle";
  const onClick = props.onClick ? props.onClick : null;
  const className = props.className ? props.className : "";
  const style = props.style ? props.style : null;
  const withIcon = props.withIcon ? props.withIcon : "";
  const htmlType = props.htmlType ? props.htmlType : "";
  let btnStyle = {};
  btnStyle = { ...btnStyle, ...style };
  let customClassname = "";
  if (!normal) {
    type = "";
    customClassname = `btn-ui-${variant}`;
  }

  return (
    <Button
      type={type}
      block={block}
      disabled={disabled}
      htmlType={htmlType}
      // href={href}
      size={size}
      onClick={onClick}
      className={`${className} ${customClassname}`}
      style={btnStyle}
    >
      {withIcon}
      {text ? ` ${text}` : null}
    </Button>
  );
};

ButtonUI.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  normal: PropTypes.bool, //Button default
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  withIcon: PropTypes.object,
  htmlType: PropTypes.string,
};
// usage
// <ButtonUI
//     default= true
//     withIcon={<MinusOutlined />}
//     text="Button"
//     onClick={handleClick}
//      variant="secondary"
// />
export default ButtonUI;
