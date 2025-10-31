'use client'

import Image from 'next/image'
import "./Style.scss";

export const Loader = () => {
  return <div className="skeleton-loader"></div>;
};

export const LoadMore = ({ heading, image, onClick }) => {
  return (
    <div className="LoadMore card" onClick={onClick}>
      <div>
        <Image src={image} alt={heading} layout="responsive" />
      </div>
      <div>
        <h3>{heading}</h3>
      </div>
    </div>
  );
};
