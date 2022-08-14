import React from "react";
import { Input } from "antd";
import {
  useHistory
} from "react-router-dom";

const Search = () => {
  const history = useHistory()

  const handleSearch = (value) => {
      if(value && value.length > 1)
        history.push(`/product?search=${value}`);
  };

  return (
    <Input.Search
      placeholder="Tìm sản phẩm"
      enterButton="Tìm kiếm"
      onSearch={handleSearch}
      className="ant-input-search--override"
    />
  );
};

export default Search;
