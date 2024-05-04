import { useState, useEffect } from 'react'
import { db } from "./config/firebase"
import { getDocs, collection } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import './App.css'
import './index.css'

function App() {
  const [productList, setProductList] = useState([])
  const [imageUrls, setImageUrls] = useState([]); // State to store image URLs

  useEffect(() => {
    // Initialize Firebase Storage
    const storage = getStorage();

    // Array of image paths in Firebase Storage
    const imagePaths = [
      'gs://it-sysarch32-store-heredia.appspot.com/prod1.jpg',
      'gs://it-sysarch32-store-heredia.appspot.com/prod2.jpg',
      // Add more image paths as needed
    ];

    // Fetch download URLs for all images
    Promise.all(imagePaths.map(path => getDownloadURL(ref(storage, path))))
      .then(urls => {
        setImageUrls(urls); // Set image URLs to state
      })
      .catch(error => {
        console.error('Error getting download URLs:', error);
      });

    const productCollection = collection(db, "products");

    const getProductList = async () => {
      try {
        const data = await getDocs(productCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data()
        }));
        setProductList(filteredData);
      } catch (err) {
        console.error(err);
      }
    }

    getProductList();
  }, []);

  return (
    <>
      <header>
        <nav>
          <p>Clothing Store</p>
        </nav>
      </header>

      <div className='product'>
        {productList.map((product, index) => (
          <div className="prod1" key={product.id}>
            {imageUrls[index] && <img src={imageUrls[index]} alt={`Product ${index + 1}`} />} {/* Render image */}
            <p>{product.product_name}</p>
            <p>{product.product_description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
