import React from 'react';
import { useRouter } from 'next/router';
import { client, urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';
import { signInWithGoogle } from '../firebase';

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  return formattedDate;
}

const ProfilePage = ({ orders }) => {
  const { user } = useStateContext();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // User is logged in, redirect to the order history page
      router.push('/profile');
    } catch (error) {
      console.error(error);
      // Handle any login errors here
    }
  };

  if (!user) {
    // Render the login component if the user is not logged in
    return (
      <div className="login-page">
        <h1 className="login-heading head__span">Please Login</h1>
        <button className="expand-button" onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1 className="head__span head-text">
        {user ? `${user.displayName}'s Order History` : 'Order History'}
      </h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-card-content">
            <h2>{order.name}</h2>
            <p>{order.email}</p>
            <p>
              {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.zip}
            </p>
            <p>Date of order: {formatDate(order._createdAt)}</p>
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._key}>
                    <td className="product-cell">
                      <div className="product-info">
                        <img
                          src={
                            item.image && item.image.length > 0
                              ? urlFor(item.image[0]).width(60).height(60).url()
                              : 'fallback-image-url'
                          }
                          alt={item.name}
                          className="product-image"
                        />
                        <div className="product-details">
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.volume && item.volume.price ? item.volume.price : 'N/A'}</td>
                    <td>{item.volume && item.volume.size ? item.volume.size : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const query = `*[_type == "orders"]`;
    const orders = await client.fetch(query);

    console.log(orders); // Log the fetched orders data

    return {
      props: { orders },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { orders: [] },
    };
  }
};

export default ProfilePage;
