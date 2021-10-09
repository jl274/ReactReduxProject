import logo from './logo.svg';
import './App.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { useState } from 'react';

function App() {

  const [productList, setProductList] = useState([]);

  return (
    <div className="App">
      <ProductList productList={productList} setProductList={setProductList}/>
      <ProductForm setProductList={setProductList}/>
    </div>
  );
}

export default App;
