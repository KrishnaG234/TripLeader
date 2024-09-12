import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Check the current temperature and forecast for accurate weather updates.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Discover hidden gems and fascinating stories with our experienced tour guides.",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Tailor your experience with our customizable options to suit your preferences.",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
