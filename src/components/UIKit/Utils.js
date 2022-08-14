import PropTypes from "prop-types"
import { Spin } from 'antd'

const Utils = {
  Loading() {
    return (
      <Spin style={{ color: "#e99667" }} />
    )
  },

  Description(props) {
    const text = props.text ? props.text : ""

    return (
      <>
        {text.match(/[^\r\n]+/g).map((item) => (
          <>
            {item}
            <br />{" "}
          </>
        ))}
      </>
    )
  },
  Money(props) {
    const price = props.price ? props.price : 0

    const defaultOptions = {
      significantDigits: 1,
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbol: "đ",
    }

    const currencyFormatter = (value) => {
      if (typeof value !== "number") {
        value = 0.0
      }

      const options = { ...defaultOptions }
      value = value.toFixed(options.significantDigits)

      const [currency, decimal] = value.split(".")

      return (
        <>
          {decimal > 0 ? (
            <>
              {currency.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                options.thousandsSeparator
              )}
              {options.decimalSeparator}
              {decimal} {options.symbol}
            </>
          ) : (
            <>
              {currency.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                options.thousandsSeparator
              )}{" "}
              {options.symbol}
            </>
          )}
        </>
      )
    }

    const output = currencyFormatter(price)

    return <>{output}</>
  },
}

Utils.Description.propTypes = {
  text: PropTypes.string,
}

Utils.Money.propTypes = {
  price: PropTypes.number,
}

export default Utils
