import React from 'react';
import Footer from '../components/ui/Footer';
import NavBar from '../components/ui/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

const MainLayout = ({numCartItems}) => {
  return (
    <>
      <NavBar numCartItems={numCartItems}/>
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;