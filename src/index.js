import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';
import Stats from './components/Stats';
import Album from './components/Album';
import AddImage from './components/AddImage'
import {createStore} from 'redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

//ACTIONS

// const increment = () => {
//   return {
//     type: 'INCREMENT'
//   }
// }

// const decrement = () => {
//   return {
//     type: 'DECREMENT'
//   }
// }

// //REDUCER

// const counter = (state = 0, action) => {

//   switch(action.type)
//   {
//     case "INCREMENT": 
//       return state+1;

//     case "DECREMENT": 
//       return state-1;
//   }
    

// }

// let store = createStore(counter)

// store.subscribe(() => console.log(store.getState()))

// store.dispatch(increment())


root.render(
  // <React.StrictMode>
  <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="stats" element={<Stats />} />
        <Route path="expensetracker" element={<ExpenseTracker />} />
        <Route path="album" element={<Album />} />
        <Route path="addimage" element={<AddImage />} />

        
      </Routes>
    </BrowserRouter>
    // <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
