/*
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productThunk';
import { addToCart } from '../features/cart/cartSlice';
import type { RootState, AppDispatch } from '../app/store';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map((product : any) => (
          <div key={product.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10, width: 200 }}>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <h4>{product.title.slice(0, 30)}...</h4>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

 
*/

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchProducts, deleteProduct } from '../features/products/productSlice';
import Button from './common/Button/Button';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          products.map((product : any) => (          
          <div
            key={product.id}
            className="flex flex-col justify-between border border-gray-200 hover:drop-shadow-[0_4px_12px_rgba(168,85,247,0.4)] transition-shadow duration-200 rounded-xl p-4 max-w-[240px] w-full h-[400px] bg-white m-2"
         >
            {/* Content Section */}
            <div className="flex flex-col gap-2 overflow-hidden flex-grow">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain"
              />

              {/* Clamp long title */}
              <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>

              <p className="text-green-600 font-bold">₹{product.price}</p>

              {/* Spacer to push button to bottom */}
              <div className="flex-grow" />
            </div>

            {/* Button always at bottom */}
            <Button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              label="Delete"
              onClick={() => dispatch(deleteProduct(product.id))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

