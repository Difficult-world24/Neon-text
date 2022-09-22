import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MainContext } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { jwt } = useContext(MainContext);
  console.log(jwt, 'jwt in side rote');
  return jwt === '' || !jwt ? <Navigate to='/login' /> : <Outlet />;
};

export default PrivateRoute;
