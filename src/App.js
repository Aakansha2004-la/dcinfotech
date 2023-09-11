import './App.css';
import { Navbar, Footer, Home, Courses, About, Contact, Profile, LoginForm } from './containers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { AxiosInterceptor } from './services/customizeAxios';
import LoginPage from './containers/login/LoginPage';
import RequireAuth from './components/RequiredAuth';

function App() {

  return (
    <>
      <div className="App">
        {/* <AxiosInterceptor> */}
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<RequireAuth allowedRoles={['student', 'admin', 'teacher']} />}>
              <Route path='/courses' element={<Courses />} />
            </Route>
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </Container>
        <Footer />
        {/* </AxiosInterceptor> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>

  );
}

export default App;
