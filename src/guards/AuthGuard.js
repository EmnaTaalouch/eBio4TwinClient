import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import { useSelector } from 'react-redux';
// pages
import Login from '../pages/auth/Login';
// components
import LoadingScreen from '../components/LoadingScreen';
import useAuthContext from '../contexts/useAuthContext';
import { UserApi } from '../actions/userAction';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { user } = useAuthContext();
  // console.log(user);
  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  /*  if (!isInitialized) {
    return <LoadingScreen />;
  } */
  console.log(currentUser);
  if (localStorage.getItem('token')) {
    console.log('refresh Token');
    UserApi.getUserById(localStorage.getItem('token').replace(/^"|"$/g, ''))
      .then((r) => {
        if (!r) {
          if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
          }
          return <Login />;
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        return <Login />;
      });
  } else {
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
