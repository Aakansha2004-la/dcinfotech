import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const token = {
  colorPrimary: '#62929e',
  colorInfo: '#62929e',
  colorBgBase: '#f1f1f9',
  colorWarning: '#cf8a00',
  colorSuccess: '#88b80f',
  colorError: '#bb1e21'
}
  ;




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ConfigProvider theme={{ token }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
