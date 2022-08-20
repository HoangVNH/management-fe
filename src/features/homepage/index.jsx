import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import PartnerCard from "./components/PartnerCard";
import { selectAllPartners } from "../partner/partnerSlice";
import { Col, Pagination, Row } from "antd";

const HomePage = () => {
  const partners = useSelector(selectAllPartners);

  return (
    <>
      <Row gutter={[0, 16]}>
        {partners.map((partner) => (
          <Col key={partner.id} span={6}>
            <PartnerCard
              key={partner.id}
              id={partner.id}
              name={partner.name}
              categoryName={partner.categoryName}
            />
          </Col>
        ))}
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination defaultCurrent={1} pageSize={5} total={20} />
      </div>
    </>
  );
};

export default HomePage;
