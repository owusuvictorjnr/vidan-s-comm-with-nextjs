import Link from 'next/link';
import React, { useContext } from 'react';
// import { xcircle } from '@heroicons/react/outline';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item,
    });
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl capitalize"> shopping cart</h1>

      {cartItems.length === 0 ? (
        <div className="">
          Cart is empty
          <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left capitalize">item</th>
                  <th className="px-5 text-right capitalize">quantity</th>
                  <th className="px-5 text-right capitalize">price</th>
                  <th className="px-5 text-right capitalize">action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>

                    <td className="p-5 text-right">
                      <select
                        value={item.countInStock}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">&#8373;{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            // className="text-red-500 flex justify-end items-end"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 capitalize text-xl">
                  subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                  &#8373;
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('/shipping')}
                  className="primary-button w-full capitalize"
                >
                  check out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartScreen;
