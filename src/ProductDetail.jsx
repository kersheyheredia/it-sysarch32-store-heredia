import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from "./config/firebase";
import { loadStripe } from '@stripe/stripe-js';
import { getDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Load the Stripe.js library with your publishable API key
const stripePromise = loadStripe('pk_test_51PEvNOEoCKfVp71pGchlLLSILQp5clDkfWmBfoh0mvVdoyBfGM6x6AWyd2EchcTruN343g3RrkhPe4MeyLCsyHPj00KmIPxHxC');

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
    try {
    const productDoc = doc(db, "products", productId);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
    setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
    } else {
    console.log("Product not found");
    }
    } catch (error) {
    console.error("Error fetching product:", error);
    }
    };
    fetchProduct();
    }, [productId]);
   // Handle the click event when the user clicks the "Checkout" button
   const handleClick = async () => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName: product.product_name, price: product.price * 100 }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      {/* Render the product image */}<img src={product.image_url} alt={product.product_name} />
      {/* Render other product details */}
      <h2>{product.product_name}</h2>
      <p>{product.product_description}</p>
      <p>{product.price}</p>
      {/* Add a checkout button or any other action buttons */}
      <button onClick={handleClick}>Checkout</button>
      {/* Add a link to navigate back to the product list */}
      <Link to="/">Back to Products</Link>
    </div>
  );
}

export default ProductDetail;
