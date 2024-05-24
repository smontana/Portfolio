import React from "react";
import "./Style.scss";

export const Loader = () => {
  return <div className="skeleton-loader"></div>;
};

export const LoadMore = ({ heading, image, onClick }) => {
  return (
    <div className="LoadMore card" onClick={onClick}>
      <div>
        <img src={image} alt={heading} />
      </div>
      <div>
        <h3>{heading}</h3>
      </div>
    </div>
  );
};
