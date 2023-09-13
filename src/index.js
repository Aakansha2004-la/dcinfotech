import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthProvider';

const token = {
  colorPrimary: "#62929e",
  colorInfo: "#62929e",
  colorBgBase: "#ffffff",
  colorBg: "#62929e",
  colorWarning: "#cf8a00",
  colorSuccess: "#88b80f",
  colorError: "#bb1e21"
}
  ;




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <ConfigProvider theme={{ token }}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ConfigProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
