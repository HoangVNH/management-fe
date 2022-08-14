import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import PartnerCard from "features/homepage/components/PartnerCard";
import { selectAllPartners } from "features/partner/partnerSlice";
import { Pagination } from "antd";

const HomePage = () => {
  const partners = useSelector(selectAllPartners);

  return (
    <div
      className="site-layout-background"
      style={{
        padding: 24,
        textAlign: 'center',
      }}
    >
      {
      partners.map((partner) => (
        <PartnerCard
          key={partner.id}
          id={partner.id}
          name={partner.name}
          categoryName={partner.categoryName}
        />
      ))}
      <div className="pagination__wrapper">
        <Pagination
          defaultCurrent={1}
          pageSize={5}
          total={20}
        />
      </div>
    </div>
  )
};

export default HomePage;
