import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import LoadingGif from './assets/images/loading.gif'
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const savedProducts = localStorage.getItem('products');

      if (savedProducts) {
          setProducts(JSON.parse(savedProducts).splice(0, 28));
          setLoading(false);
      } else {
          setTimeout(() => {
              fetch('https://api.escuelajs.co/api/v1/products')
                  .then(response => response.json())
                  .then(data => {
                      const limitedProducts = data.splice(0, 28);
                      setProducts(limitedProducts);
                      localStorage.setItem('products', JSON.stringify(limitedProducts));
                      setLoading(false);
                  })
                  .catch(error => {
                      console.error("Error fetching products:", error);
                      setLoading(false);
                  });
          }, 2000);
      }
  }, []);

  const handleDelete = (id) => {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Update local storage after deletion
  };

  if (loading) {
      return (
          <div className="flex justify-center items-center h-screen bg-gray-100">
              <img src={LoadingGif} alt="Loading..." className="w-20 h-20" />
          </div>
      );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <h2 className='text-center text-[45px] text-blue-900 font-bold'>Online Shop</h2>
          <div className="flex flex-wrap justify-center">
              {products.map(product => (
                  <ProductCard key={product.id} product={product} onDelete={handleDelete} />
              ))}
          </div>
      </div>
  );
};

export default App;
