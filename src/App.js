import './App.css';
import { Navbar, Footer, Home, Courses, About, Contact, Profile, LoginForm } from './containers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { AxiosInterceptor } from './services/customizeAxios';
import LoginPage from './containers/login/LoginPage';
import RequireAuth from './components/RequiredAuth';
import CoursesManagement from './containers/courses/CoursesManagement';
import MyCourses from './containers/courses/MyCourses';

export const allowedRoles = {
  student: 'student',
  admin: 'admin',
  teacher: 'teacher'
}

function App() {

  const location = useLocation();
  useEffect(() => {
    console.log("url changed")
  }, [location]);


  return (
    <>
      <div className="App">
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<RequireAuth allowedRoles={[allowedRoles.admin, allowedRoles.student, allowedRoles.teacher]} />}>
              <Route path='/courses' element={<Courses />} />
              <Route path='/my-courses' element={<MyCourses />} />
              <Route path='/profile' element={<Profile />} />
            </Route>

            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<RequireAuth allowedRoles={[allowedRoles.admin]} />}>
              <Route path='/admin/courses' element={<CoursesManagement />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
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
      </div>

    </>

  );
}

export default App;
