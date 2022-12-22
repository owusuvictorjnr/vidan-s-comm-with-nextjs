import React from 'react';
import Link from 'next/link';

const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} className="">
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>

        <p className="mb-2">{product.brand}</p>

        <p>&#8373;{product.price}</p>

        <button type="button" className="primary-button">
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
