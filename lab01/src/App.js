import logo from './logo.svg';
import './App.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { useState } from 'react';

function App() {

  // product list
  const [productList, setProductList] = useState([]);

  // updating list without using network
  const updateFromForm = (newProduct) => {

    // const newProductModified = {...newProduct};
    // newProductModified['id'] = newProductModified.id + 1;
    // console.log(newProductModified.id);

    setProductList([
      ...productList,
      newProduct
    ]);
  };

  const deleteFromForm = (id) => {
    console.log(productList[0].id);
    console.log(id);
    const newProductList = productList.filter(x => x.id !== id);
  }

  return (
    <div className="App">
      <ProductList productList={productList} setProductList={setProductList}  delete={deleteFromForm}/>
      <ProductForm updateProductList={updateFromForm}/>
    </div>
  );
}

export default App;
