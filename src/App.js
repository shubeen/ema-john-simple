import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useContext } from 'react';


 export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [user, setUser] = useState({})
  
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser] } >

  <h3>email: {loggedInUser.name}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path= '/shop'>
            <Shop></Shop>
          </Route>
          <Route path= '/review'>
            <Review></Review>
          </Route>
          <PrivateRoute path = '/inventory'>
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path = '/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path = '/login'>
            <Login></Login>
          </Route>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path= '/product/:productKey'>
            <ProductDetails></ProductDetails>

          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
