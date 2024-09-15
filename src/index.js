import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Documentation from './documentation';
import HomeComponent from './components/main';
import reportWebVitals from './reportWebVitals';
import DocumentVideo from './documentation-video';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Documentation />
    <HomeComponent />
    <DocumentVideo />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
