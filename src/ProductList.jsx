// ProductList.js
import React, { useState, useEffect } from 'react';
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';

export function ProductList() {
  const [productList, setProductList] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const storage = getStorage();
    const imagePaths = [
      'gs://it-sysarch32-store-heredia.appspot.com/prod1.jpg',
      'gs://it-sysarch32-store-heredia.appspot.com/prod2.jpg',
      'gs://it-sysarch32-store-heredia.appspot.com/cardigan.jpg'
    ];

    Promise.all(imagePaths.map(path => getDownloadURL(ref(storage, path))))
      .then(urls => {
        setImageURLs(urls);
      })
      .catch(error => {
        console.error('Error getting download URLs:', error);
      });

    const productCollection = collection(db, "products");

    getDocs(productCollection)
      .then(snapshot => {
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductList(products);
      })
      .catch(error => {
        console.error('Error getting products:', error);
      });
  }, []);

  return (
    <div className='product'>
      {productList.map((product, index) => (
        <Product key={product.id} product={product} imagePath={imageURLs[index]} />
      ))}
    </div>
  );
}

function Product({ product, imagePath }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="prod1">
        <img src={imagePath} alt={product.product_name} />
        <p>{product.product_name}</p>
        <p>{product.product_description}</p>
        <p>{product.price}</p>
      </div>
    </Link>
  );
}
export default ProductList;