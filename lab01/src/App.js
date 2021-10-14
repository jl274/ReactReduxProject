import './App.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

function App() {

  // product list
  const [productList, setProductList] = useState([]);

  // updating list without using network POST
  const updateFromForm = (newProduct) => {

    // const newProductModified = {...newProduct};
    // newProductModified['id'] = newProductModified.id + 1;
    // console.log(newProductModified.id);

    setProductList([
      ...productList,
      newProduct
    ]);
  };

  // after PUT
  const reUpdateFromForm = (editedProduct) => {
    const newProductList = productList.map(x => {
      console.log(x)
      if (parseInt(x.id) === parseInt(editedProduct.id)){
        return editedProduct
      } else {
        return x
      }
    })
    console.log(newProductList)
    setProductList(newProductList);
  }

  const deleteFromForm = (id) => {
    const newList =productList.filter(x => x.id !== id);
    setProductList(newList);
    <Redirect to="/products"/>
  };

  return (
    <Router history={customHistory}>
      <div className="App">
        {/* <ProductList productList={productList} setProductList={setProductList}  delete={deleteFromForm}/>
        <ProductForm updateProductList={updateFromForm}/> */}
        <Navbar />
        <Switch>

          <Route path="/products/:id/edit" exact>
            <ProductForm updateProductList={reUpdateFromForm} appUserList={productList} />
          </Route>

          <Route path="/products/new">
            <ProductForm updateProductList={updateFromForm}/>
          </Route>
          
          <Route path="/products" >
            <ProductList productList={productList} setProductList={setProductList}  delete={deleteFromForm} exact/>
          </Route>

          <Route path="/" exact>
            {<Redirect to="/products"/>}
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
