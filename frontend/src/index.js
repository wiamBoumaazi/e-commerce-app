import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import thunk from 'redux-thunk';

import { setActiveUsers, setItemViewCount } from './redux/actions/buyerActions';
import { setItemSold } from './redux/actions/buyerActions';

import ReactNotification from "react-notifications-component"

import { store } from "react-notifications-component"
import "animate.css"
import 'react-notifications-component/dist/theme.css'

const notification = (e) => {
  console.log('hi');
  store.addNotification({
    title: "New Buyer",
    message: e + " Make a purchase!",
    type: "success",
    container: "top-right",
    insert: "top",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],

    dismiss:{
      duration: 2000
    }
  })
}


const ws = new WebSocket('ws://localhost:4008');
const store2 = createStore(rootReducer, applyMiddleware(thunk));

ws.onclose = () => {
  console.log("Connection closed");
};

ws.onmessage = (message) => {
  console.log(message);
  const messageObject = JSON.parse(message.data);
  //const messageObject = message.data;

  console.log(messageObject);
  switch(messageObject.type){
     case 'UPDATE_USER_COUNT':
       store2.dispatch(setActiveUsers(messageObject.count));
       break;
     case 'UPDATE_SOLD':
       //store2.dispatch(setItemSold(messageObject.newSale));

       notification(messageObject.user);
       break;
     case 'UPDATE_ITEM_VIEW_COUNT':
       store2.dispatch(setItemViewCount(messageObject.itemViewCount));
    default:
      console.log('');
  }
};

ws.onerror = () =>{
  //call if timeout or internet drops
  console.log("Connection closed with error")  //server goes down with error
};

ws.onopen = () =>{
  console.log("Connection opened")// on frontend page
};

ReactDOM.render(
  <Provider store={store2}>
    <Router>
    <ReactNotification /> 
      <App />
    </Router>,
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default ws;
