import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// sharedComponents
import { StyledChart } from './sharedComponents/chart';
import ScrollToTop from './sharedComponents/scroll-to-top';
import { UserApi } from './actions/userAction';
import { addUser } from './redux/slice/userSlice';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('refresh Token');
      UserApi.getUserById(localStorage.getItem('token').replace(/^"|"$/g, ''))
        .then((r) => {
          dispatch(addUser(r));
        })
        .catch(() => {
          localStorage.removeItem('token');
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        });
    }
  }, []);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
