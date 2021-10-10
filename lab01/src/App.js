import logo from './logo.svg';
import './App.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { useState } from 'react';

function App() {

  const [productList, setProductList] = useState([]);

  const updateFromForm = (newProduct) => {

    // const newProductModified = {...newProduct};
    // newProductModified['id'] = newProductModified.id + 1;
    // console.log(newProductModified.id);

    setProductList([
      ...productList,
      newProduct
    ]);
  };

  return (
    <div className="App">
      <ProductList productList={productList} setProductList={setProductList}/>
      <ProductForm updateProductList={updateFromForm}/>
    </div>
  );
}

export default App;
